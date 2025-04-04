import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import styled from 'styled-components';

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
import { UserRole } from 'apis/user/types';


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
              color="label-alternative"
              variant="body1Normal"
              style={{
                fontWeight: 600,
              }}
            >
              {data?.length}개
            </Typography>
          </TitleWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    코드이름
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    코드값
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((code) => (
                <TableRow key={code.code}>
                  <TableCell justifyContent="center">
                    <Chip
                      role={code.role.name}
                      size="large"
                      text={code.role.label}
                    />
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography color="label-normal" variant="body1Normal">
                      {code.code}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
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
          code={code}
          confirmPopupOpen={confirmPopupOpen}
          handleConfirmPopup={handleConfirmPopup}
          handleEditPopup={refresh}
          role={role}
          onChange={onChangeCode}
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
