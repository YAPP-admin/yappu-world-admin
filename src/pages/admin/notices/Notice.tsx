import Trash from '@assets/Trash';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import TextButton from '@compnents/Button/TextButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useAllNoticeQuery } from '@queries/notice/useAllNoticeQuery';
import dayjs from 'dayjs';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const Notice: FC = () => {
  const { data } = useAllNoticeQuery();
  return (
    <>
      <Container>
        <FlexBox justify="space-between" height="fit-content">
          <Typography variant="title2Bold">공지사항</Typography>
          <SolidButton size="medium">글쓰기</SolidButton>
        </FlexBox>
        <FlexBox direction="column" gap={8}>
          <FlexBox justify="space-between" height="fit-content">
            <FlexBox justify="space-between" height="fit-content">
              <FlexBox gap={8} height="fit-content" width="fit-content">
                <Typography variant="headline1Bold">공지리스트</Typography>
                <Typography
                  variant="body1Normal"
                  color="label-alternative"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {data?.totalCount}개
                </Typography>
              </FlexBox>
              <OutlinedButton
                color="status-negative"
                leftIcon={
                  <Trash size="16" color={theme.colors.status.nagative} />
                }
                variant="assistive"
              >
                삭제
              </OutlinedButton>
            </FlexBox>
          </FlexBox>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th" justifyContent="center">
                  <Checkbox />
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    번호
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    제목
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    타입
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    이름
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    작성일
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((notice) => (
                <TableRow key={notice.noticeId}>
                  <TableCell justifyContent="center">
                    <Checkbox />
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography variant="body1Normal" color="label-normal">
                      {notice.noticeId}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography variant="body1Normal" color="label-normal">
                      {notice.title}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography variant="body1Normal" color="label-normal">
                      {notice.noticeType}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography variant="body1Normal" color="label-normal">
                      {notice.writer.name}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
                    <Typography variant="body1Normal" color="label-normal">
                      {dayjs(notice.createdAt).format('YYYY.MM.DD hh:mm')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </FlexBox>
      </Container>
    </>
  );
};

export default Notice;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;
