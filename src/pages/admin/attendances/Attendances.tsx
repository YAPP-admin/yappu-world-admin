import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import { useAttendancesQuery } from '@queries/attendance/useAttendancesQuery';
import { useEditAttendanceMutation } from '@queries/attendance/useEditAttendanceMutation';
import { useAttendanceStore } from '@stores/attendanceStore';
import { AttendanceStatusType, EditAttendanceReq } from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';
import { showErrorToast } from 'types/showErrorToast';

import AttendanceDetail from './AttendanceDetail';
import AttendaceEdit from './AttendanceEdit';

const Attendances: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useAttendancesQuery();
  const getTargets = useAttendanceStore((state) => state.getTargets);
  const { editPopupOpen, setEditPopupOpen } = useAttendanceStore();
  const { mutateAsync } = useEditAttendanceMutation();
  const queryClient = useQueryClient();

  const sessionMap = useMemo(() => {
    return data?.attendancesGroupedBySession.reduce(
      (acc, group) => {
        acc[group.sessionId] = group.attendances.reduce(
          (userMap, status) => {
            userMap[status.userId] = status.status;
            return userMap;
          },
          {} as Record<string, AttendanceStatusType | null>,
        );
        return acc;
      },
      {} as Record<string, Record<string, AttendanceStatusType | null>>,
    );
  }, [data?.attendancesGroupedBySession]);

  const onClickToSave = async () => {
    try {
      const req: EditAttendanceReq = {
        targets: getTargets(),
      };
      await mutateAsync(req);
      setEditPopupOpen(false);
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(err.response?.data.message ?? '');
      }
    }
  };

  return (
    <Container>
      <Typography variant="title2Bold">출석관리</Typography>
      <FlexBox justify="space-between" width="100%">
        <FlexBox align="center" gap={8} justify="center" width="fit-content">
          <Typography variant="headline1Bold">26기</Typography>
          <Typography color="label-assistive" variant="body1Normal">
            {data?.users.length}명
          </Typography>
        </FlexBox>
        {isEdit ? (
          <FlexBox gap={8} width="fit-content">
            <OutlinedButton
              size="xsmall"
              variant="assistive"
              onClick={() => setIsEdit(true)}
            >
              일괄수정
            </OutlinedButton>
            <SolidButton size="xsmall" onClick={() => setEditPopupOpen(true)}>
              저장
            </SolidButton>
          </FlexBox>
        ) : (
          <OutlinedButton
            size="xsmall"
            variant="assistive"
            onClick={() => setIsEdit(true)}
          >
            수정
          </OutlinedButton>
        )}
      </FlexBox>
      <Wrapper>
        {isEdit ? (
          <AttendaceEdit
            sessionMap={sessionMap}
            sessions={data?.sessions}
            users={data?.users}
          />
        ) : (
          <AttendanceDetail
            sessionMap={sessionMap}
            sessions={data?.sessions}
            users={data?.users}
          />
        )}
      </Wrapper>
      {editPopupOpen && (
        <ConfirmPopup
          comment="수정사항을 반영하여 저장할까요?"
          confirmActionLabel="저장"
          title="수정사항 저장"
          onCancelAction={() => setEditPopupOpen(false)}
          onConfirmAction={onClickToSave}
        />
      )}
    </Container>
  );
};

export default Attendances;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 40px;
  max-width: 1126px;
`;

const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
