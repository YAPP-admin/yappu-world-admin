import Trash from '@assets/Trash';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useAllNoticeQuery } from '@queries/notice/useAllNoticeQuery';
import { useNoticeStore } from '@stores/noticeStore';
import { deleteNotice } from 'apis/notice/NoticeApis';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

const NoticeList: FC = () => {
  const { data } = useAllNoticeQuery();
  const navigate = useNavigate();
  const {
    selectedIndexes,
    setSelectedIndexes,
    isDeletePopup,
    setIsDeletePopup,
    isDeleteCompletePopup,
    setIsDeleteCompletePopup,
  } = useNoticeStore();

  const noticeIds = data?.data.map((notice) => Number(notice.noticeId)) || [];

  const isAllChecked =
    noticeIds.length > 0 &&
    noticeIds.every((id) => selectedIndexes.includes(id));

  const onClickAllCheck = () => {
    if (isAllChecked) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(noticeIds);
    }
  };

  const onClickRowCheck = (id: number) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((v) => v !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const onClickMoveToWrite = () => {
    navigate('/admin/notices/write');
  };

  const onClickRow = (id: string) => {
    navigate(`/admin/notices/detail/${id}`);
  };

  const onClickToDelete = async () => {
    try {
      await Promise.all(
        selectedIndexes.map((id) => deleteNotice({ id: String(id) })),
      );
      setIsDeleteCompletePopup(true);
    } catch (err) {
      console.error('삭제 중 일부 실패:', err);
    }
  };

  return (
    <>
      <Container>
        <FlexBox justify="space-between" height="fit-content">
          <Typography variant="title2Bold">공지사항</Typography>
          <SolidButton size="medium" onClick={onClickMoveToWrite}>
            글쓰기
          </SolidButton>
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
                disabled={!selectedIndexes.length}
                onClick={() => setIsDeletePopup(true)}
              >
                삭제
              </OutlinedButton>
            </FlexBox>
          </FlexBox>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th" justifyContent="center">
                  <Checkbox
                    state={isAllChecked ? 'checked' : 'unchecked'}
                    onClick={onClickAllCheck}
                  />
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
              {data?.data.map((notice) => {
                const id = Number(notice.noticeId);
                const isChecked = selectedIndexes.includes(id);
                return (
                  <TableRow
                    key={notice.noticeId}
                    onClick={() => onClickRow(notice.noticeId)}
                  >
                    <TableCell
                      justifyContent="center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        state={isChecked ? 'checked' : 'unchecked'}
                        onClick={() => onClickRowCheck(id)}
                      />
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
                );
              })}
            </TableBody>
          </StyledTable>
        </FlexBox>
      </Container>
      {isDeletePopup && (
        <ConfirmPopup
          title="링크 삭제"
          comment={`선택하신 ${selectedIndexes.length}개의 링크를 삭제하시겠습니까?`}
          confirmActionLabel="삭제"
          onConfirmAction={onClickToDelete}
          onCancelAction={() => setIsDeletePopup(false)}
        />
      )}
      {isDeleteCompletePopup && (
        <CompletePopup
          title="삭제 완료"
          comment="삭제되었습니다."
          onClose={() => setIsDeleteCompletePopup(false)}
        />
      )}
    </>
  );
};

export default NoticeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;
