import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Trash from '@assets/Trash';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Chip from '@compnents/commons/Chip';
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
import { useDeleteNoticeMutation } from '@queries/notice/useDeleteNoticeMutation';
import { useNoticeStore } from '@stores/noticeStore';
import theme from 'styles/theme';
import { noticeHeader } from '@constants/tableHeader';
import Pagination from '@compnents/table/Pagination';

const NoticeList: FC = () => {
  const {
    selectedIndexes,
    setSelectedIndexes,
    isDeletePopup,
    setIsDeletePopup,
    isDeleteCompletePopup,
    setIsDeleteCompletePopup,
    isAddNoticeComplete,
    setIsAddNoticeComplete,
    page,
    setPage,
  } = useNoticeStore();
  const { data } = useAllNoticeQuery(page);
  const navigate = useNavigate();
  const { mutate } = useDeleteNoticeMutation();

  const noticeIds = data?.data.map((notice) => notice.noticeId) || [];

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

  const onClickRowCheck = (id: string) => {
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
    mutate({ noticeIds: selectedIndexes });
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
        <Wrapper>
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
                  {noticeHeader.map((el) => (
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
                {data?.data.map((notice, index) => {
                  const id = notice.noticeId;
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
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell justifyContent="center">
                        <Typography color="label-normal" variant="body1Normal">
                          {notice.title}
                        </Typography>
                      </TableCell>
                      <TableCell justifyContent="center">
                        <Chip
                          size="large"
                          text={notice.noticeType}
                          variant="weak"
                          color={
                            notice.noticeType === '운영'
                              ? 'primary'
                              : 'secondary'
                          }
                        />
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
          <Pagination
            totalPages={20}
            currentPage={page}
            onPageChange={setPage}
          />
        </Wrapper>
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
      {isAddNoticeComplete && (
        <CompletePopup
          comment="작성하신 공지사항이 등록되었습니다."
          title="등록 완료"
          onClose={() => setIsAddNoticeComplete(false)}
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

const Wrapper = styled.div`
  border: 1px solid red;
  flex: 1;
  display: flex;
  flex-direction: column;

  > div:first-child {
    flex: 1;
  }
`;
