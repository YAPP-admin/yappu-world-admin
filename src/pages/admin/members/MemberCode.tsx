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
import useMemberCodeQuery from '@queries/auth/useMemberCodeQuery';
import { useMemberCodeStore } from '@stores/memberCodeStore';
import { MemberCodeInfo } from 'apis/auth/types';

const tableHeaders = ['코드이름', '코드값', ''];

const MemberCode: FC = () => {
  const { data } = useMemberCodeQuery();

  const {
    selectedCode,
    setSelectedCode,
    editPopupOpen,
    handleEditPopup,
    confirmPopupOpen,
    handleConfirmPopup,
  } = useMemberCodeStore();

  const onClickToEdit = (value: MemberCodeInfo) => {
    setSelectedCode(value);
    handleEditPopup();
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
              {data?.codes.length}개
            </Typography>
          </TitleWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                {tableHeaders.map((el) => (
                  <TableCell key={el} as="th" justifyContent="center">
                    <Typography
                      color="label-normal"
                      variant="body1Normal"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {el}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.codes.map((code) => (
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
                    <TextButton onClick={() => onClickToEdit(code)}>
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
          confirmPopupOpen={confirmPopupOpen}
          handleConfirmPopup={handleConfirmPopup}
          handleEditPopup={handleEditPopup}
          selectedCode={selectedCode}
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
