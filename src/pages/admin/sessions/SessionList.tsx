import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Plus from '@assets/Plus';
import Trash from '@assets/Trash';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import Pagination from '@compnents/table/Pagination';
import StyledTable from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { sessionHeader } from '@constants/tableHeader';
import { useDeleteSessionMutation } from '@queries/session/useDeleteSessionMutation';
import { useSessionQuery } from '@queries/session/useSessionQuery';
import { useSessionStore } from '@stores/sessionStore';
import { getSessionType } from '@utils/getSessionType';
import { ErrorResponse } from 'apis/common/types';
import theme from 'styles/theme';
import { showErrorToast } from 'types/showErrorToast';

const SessionList: FC = () => {
  const {
    page,
    setPage,
    selectedIndexes,
    setSelectedIndexes,
    isDeletePopup,
    setIsDeletePopup,
    isDeleteCompletePopup,
    setIsDeleteCompletePopup,
  } = useSessionStore();
  const { data } = useSessionQuery(page);
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteSessionMutation();
  const queryClient = useQueryClient();

  const sessionIds = data?.data.map((session) => session.id) || [];

  const isAllChecked =
    sessionIds.length > 0 &&
    sessionIds.every((id) => selectedIndexes.includes(id));

  const onClickAllCheck = () => {
    if (isAllChecked) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(sessionIds);
    }
  };

  const onClickRowCheck = (id: string) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((v) => v !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const onClickToAdd = () => {
    navigate('/admin/sessions/write');
  };

  const onClickRow = (id: string) => {
    navigate(`/admin/sessions/detail/${id}`);
  };

  const onClickToDelete = async () => {
    try {
      await mutateAsync({ ids: selectedIndexes });
      queryClient.invalidateQueries({ queryKey: ['session-list', page] });
      setIsDeletePopup(false);
      setIsDeleteCompletePopup(true);
      setSelectedIndexes([]);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ??
            '알 수 없는 오류가 발생했습니다.\n관리자에게 문의해주세요.',
        );
      }
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <FlexBox height="fit-content" justify="space-between">
          <Typography variant="title2Bold">세션</Typography>
          <SolidButton
            leftIcon={<Plus color="#FFF" size="18" />}
            size="medium"
            onClick={onClickToAdd}
          >
            세션 추가
          </SolidButton>
        </FlexBox>
        <Wrapper>
          <FlexBox direction="column" gap={8}>
            <FlexBox height="fit-content" justify="space-between">
              <FlexBox
                align="center"
                height="fit-content"
                justify="space-between"
              >
                <FlexBox gap={8} height="fit-content" width="fit-content">
                  <Typography variant="headline1Bold">세션 리스트</Typography>
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
                  <TableCell as="th">
                    <Checkbox
                      state={isAllChecked ? 'checked' : 'unchecked'}
                      onClick={onClickAllCheck}
                    />
                  </TableCell>
                  {sessionHeader.map((el) => (
                    <TableCell key={el} as="th">
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
                {data?.data.map((session) => {
                  const id = session.id;
                  const isChecked = selectedIndexes.includes(id);

                  return (
                    <TableRow
                      key={session.id}
                      onClick={() => onClickRow(session.id)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          state={isChecked ? 'checked' : 'unchecked'}
                          onClick={() => onClickRowCheck(id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {session.generation}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={getSessionType(session.type).color}
                          size="large"
                          text={getSessionType(session.type).text}
                          variant={getSessionType(session.type).style}
                        />
                      </TableCell>
                      <TableCell justifyContent="flex-start">
                        <Typography
                          color="primary-normal"
                          variant="body1Normal"
                        >
                          {session.title}
                        </Typography>
                      </TableCell>
                      <TableCell justifyContent="flex-start">
                        <Typography color="label-normal" variant="body1Normal">
                          {session.place ?? '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {dayjs(session.date).format('YYYY.MM.DD')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {session.time} - {session.endTime}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </FlexBox>
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
          />
        </Wrapper>
        {isDeletePopup && (
          <ConfirmPopup
            comment={`선택하신 ${selectedIndexes.length}개의 세션을 삭제하시겠습니까?`}
            confirmActionLabel="삭제"
            title="세션 삭제"
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
      </Container>
    </>
  );
};

export default SessionList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > div:first-child {
    flex: 1;
  }
`;
