import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import { useAttendancesQuery } from '@queries/attendance/useAttendancesQuery';
import { useEditAttendanceMutation } from '@queries/attendance/useEditAttendanceMutation';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useAttendanceStore } from '@stores/attendanceStore';
import {
  AttendanceStatusValueType,
  EditAttendanceReq,
} from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';
import BundleEditPopup from 'features/attendance/BundleEditPopup';
import { showErrorToast } from 'types/showErrorToast';

import AttendanceDetail from './AttendanceDetail';
import AttendaceEdit from './AttendanceEdit';

const Attendances: FC = () => {
  const { data: attendancesData } = useAttendancesQuery();
  const { data: generationData } = useGenerationListQuery(1, 100);
  const getTargets = useAttendanceStore((state) => state.getTargets);
  const {
    isEdit,
    setIsEdit,
    editPopupOpen,
    setEditPopupOpen,
    bundleEditPopupOpen,
    setBundleEditPopupOpen,
    bundleEditCompletePopupOpen,
    setBundleEditCompletePopupOpen,
    generation,
    setGeneration,
  } = useAttendanceStore();
  const { mutateAsync } = useEditAttendanceMutation();
  const queryClient = useQueryClient();

  const sessionMap = useMemo(() => {
    return attendancesData?.attendancesGroupedBySession.reduce(
      (acc, group) => {
        acc[group.sessionId] = group.attendances.reduce(
          (userMap, status) => {
            userMap[status.userId] = status.status;
            return userMap;
          },
          {} as Record<string, AttendanceStatusValueType | null>,
        );
        return acc;
      },
      {} as Record<string, Record<string, AttendanceStatusValueType | null>>,
    );
  }, [attendancesData?.attendancesGroupedBySession]);

  const onClickToSave = async () => {
    try {
      const req: EditAttendanceReq = getTargets();
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

  useEffect(() => {
    if (!generationData?.data) return;
    const activeGeneration = generationData.data.find((el) => el.isActive);
    if (activeGeneration) setGeneration(activeGeneration?.generation);
  }, [generationData?.data]);

  return (
    <Container>
      <Typography variant="title2Bold">출석관리</Typography>
      <FlexBox justify="space-between" width="100%">
        <FlexBox align="center" gap={8} justify="center" width="fit-content">
          <Typography variant="headline1Bold">{generation}기</Typography>
          <Typography color="label-assistive" variant="body1Normal">
            {attendancesData?.users.length}명
          </Typography>
        </FlexBox>
        {isEdit ? (
          <FlexBox gap={8} width="fit-content">
            <OutlinedButton
              size="xsmall"
              variant="assistive"
              onClick={() => setBundleEditPopupOpen(true)}
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
            sessions={attendancesData?.sessions}
            users={attendancesData?.users}
          />
        ) : (
          <AttendanceDetail
            sessionMap={sessionMap}
            sessions={attendancesData?.sessions}
            users={attendancesData?.users}
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
      {bundleEditPopupOpen && (
        <BundleEditPopup
          session={attendancesData?.sessions}
          attendancesGroupedBySession={
            attendancesData?.attendancesGroupedBySession
          }
          onClose={() => setBundleEditPopupOpen(false)}
        />
      )}
      {bundleEditCompletePopupOpen && (
        <CompletePopup
          comment="선택한 세션의 출석상태가 일괄변경되었습니다."
          title="일괄 수정 완료"
          onClose={() => setBundleEditCompletePopupOpen(false)}
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
  width: 90%;
  min-width: 0;
  overflow-x: auto;
`;

const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
