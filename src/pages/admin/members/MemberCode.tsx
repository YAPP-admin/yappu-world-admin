import TextButton from '@compnents/Button/TextButton';
import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import CodeEditPopup from '@compnents/popup/CodeEditPopup';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useMemberCodeMutation } from '@queries/auth/useMemberCodeMutation';
import useMemberCodeQuery from '@queries/auth/useMemberCodeQuery';
import { useMemberCodeStore } from '@stores/memberCodeStore';
import { useQueryClient } from '@tanstack/react-query';
import { UserRole } from 'apis/user/types';
import { FC } from 'react';
import styled from 'styled-components';

const MemberCode: FC = () => {
  const { data } = useMemberCodeQuery();
  const { mutate } = useMemberCodeMutation();
  const queryClient = useQueryClient();

  const {
    code,
    onChangeCode,
    editPopupOpen,
    handleEditPopup,
    confirmPopupOpen,
    handleConfirmPopup,
    role,
    onChangeRole,
  } = useMemberCodeStore();

  const onClickToEdit = (role: UserRole, code: string) => {
    onChangeCode(code);
    onChangeRole(role);
    handleEditPopup();
  };

  const refresh = () => {
    handleEditPopup();
    onChangeCode('');
    onChangeRole(null);
  };

  const onSubmit = () => {
    if (role) {
      mutate({ role: role.name, code });
    }
    handleEditPopup();
    handleConfirmPopup();
    queryClient.invalidateQueries({ queryKey: ['member-code'] });
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">가입코드 관리</Typography>
        <Wrapper>
          <TitleWrapper>
            <Typography variant="headline1Bold">설정된 가입코드</Typography>
            <Typography
              variant="body1Normal"
              color="label-alternative"
              style={{
                fontWeight: 600,
              }}
            >
              4개
            </Typography>
          </TitleWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    코드이름
                  </Typography>
                </TableCell>
                <TableCell as="th">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    코드값
                  </Typography>
                </TableCell>
                <TableCell as="th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((code) => (
                <TableRow key={code.code}>
                  <TableCell>
                    <Chip text={code.role.label} size="large" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1Normal" color="label-normal">
                      {code.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextButton
                      onClick={() => onClickToEdit(code.role, code.code)}
                    >
                      수정
                    </TextButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Wrapper>
      </Container>
      {editPopupOpen && (
        <CodeEditPopup
          handleEditPopup={refresh}
          role={role}
          code={code}
          onChange={onChangeCode}
          handleConfirmPopup={handleConfirmPopup}
          confirmPopupOpen={confirmPopupOpen}
          onSave={onSubmit}
        />
      )}
    </>
  );
};

export default MemberCode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
