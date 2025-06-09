import { FC } from 'react';
import styled from 'styled-components';

import TextButton from '@compnents/Button/TextButton';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { CodeHeader } from '@constants/tableHeader';
import { useAttendanceCodeQuery } from '@queries/attendance/useAttendanceCodeQuery';
import { useAttendanceCodeStore } from '@stores/attendanceCodeStore';
import CodeEditPopup from 'features/attendance/CodeEditPopup';

const AttendanceCode: FC = () => {
  const { editPopupOpen, handleEditPopup } = useAttendanceCodeStore();
  const { data } = useAttendanceCodeQuery();

  const onClickToEdit = () => {
    handleEditPopup(true);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">출석코드 관리</Typography>
        <Wrapper>
          <TitleWrapper>
            <Typography variant="headline1Bold">출석코드</Typography>
            <Typography
              color="label-alternative"
              variant="body1Normal"
              style={{
                fontWeight: 600,
              }}
            >
              {data?.code ? '1' : '0'}개
            </Typography>
          </TitleWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {CodeHeader.map((el) => (
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
              <TableRow>
                <TableCell justifyContent="center">출석코드</TableCell>
                <TableCell justifyContent="center">
                  <Typography color="label-normal" variant="body1Normal">
                    {data?.code}
                  </Typography>
                </TableCell>
                <TableCell justifyContent="center">
                  <TextButton onClick={() => onClickToEdit()}>수정</TextButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Wrapper>
      </Container>
      {editPopupOpen && (
        <CodeEditPopup
          code={data?.code}
          onClose={() => handleEditPopup(false)}
        />
      )}
    </>
  );
};

export default AttendanceCode;

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
