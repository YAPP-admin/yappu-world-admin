import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        <FlexBox height="fit-content" justify="space-between">
          <Typography variant="title2Bold">공지사항</Typography>
          <SolidButton size="medium" onClick={onClickMoveToWrite}>
            글쓰기
          </SolidButton>
        </FlexBox>
        <FlexBox direction="column" gap={8}>
          <FlexBox height="fit-content" justify="space-between">
            <FlexBox height="fit-content" justify="space-between">
              <FlexBox gap={8} height="fit-content" width="fit-content">
                <Typography variant="headline1Bold">공지리스트</Typography>
                <Typography
                  color="label-alternative"
                  variant="body1Normal"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {data?.totalCount}개
                </Typography>
              </FlexBox>
              <OutlinedButton
                color="status-negative"
                disabled={!selectedIndexes.length}
                variant="assistive"
                leftIcon={
                  <Trash color={theme.colors.status.nagative} size="16" />
                }
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
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    번호
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
                    제목
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
                    타입
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
                    이름
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
                      <Typography color="label-normal" variant="body1Normal">
                        {notice.noticeId}
                      </Typography>
                    </TableCell>
                    <TableCell justifyContent="center">
                      <Typography color="label-normal" variant="body1Normal">
                        {notice.title}
                      </Typography>
                    </TableCell>
                    <TableCell justifyContent="center">
                      <Typography color="label-normal" variant="body1Normal">
                        {notice.noticeType}
                      </Typography>
                    </TableCell>
                    <TableCell justifyContent="center">
                      <Typography color="label-normal" variant="body1Normal">
                        {notice.writer.name}
                      </Typography>
                    </TableCell>
                    <TableCell justifyContent="center">
                      <Typography color="label-normal" variant="body1Normal">
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
          comment={`선택하신 ${selectedIndexes.length}개의 링크를 삭제하시겠습니까?`}
          confirmActionLabel="삭제"
          title="링크 삭제"
          onCancelAction={() => setIsDeletePopup(false)}
          onConfirmAction={onClickToDelete}
        />
      )}
      {isDeleteCompletePopup && (
        <CompletePopup
          comment="삭제되었습니다."
          title="삭제 완료"
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
