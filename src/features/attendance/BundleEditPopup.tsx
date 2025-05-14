import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Select from '@compnents/commons/Select';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { attendanceOptions } from '@constants/optionList';
import { useEditAttendanceBundleMutation } from '@queries/attendance/useEditAttendanceBundleMutation';
import { useAttendanceStore } from '@stores/attendanceStore';
import { useQueryClient } from '@tanstack/react-query';
import {
  AttendanceGroup,
  AttendanceSession,
  AttendanceStatusValueType,
  EditAttendanceReq,
} from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { showErrorToast } from 'types/showErrorToast';

interface Props {
  onClose: VoidFunction;
  session?: AttendanceSession[];
  attendancesGroupedBySession?: AttendanceGroup[];
}

const BundleEditPopup: FC<Props> = ({
  onClose,
  session,
  attendancesGroupedBySession,
}) => {
  const [selectedSession, setSelectedSession] = useState<{
    label: string;
    value: string;
    id: string;
  }>({ label: '', value: '', id: '' });
  const [status, setStatus] = useState('');
  const { mutateAsync } = useEditAttendanceBundleMutation();
  const { setBundleEditCompletePopupOpen, setIsEdit } = useAttendanceStore();
  const queryClient = useQueryClient();

  const sessionList =
    session?.map(({ startDate, name, sessionId }) => {
      return {
        label: `${startDate} / ${name}`,
        value: `${startDate} / ${name}`,
        id: sessionId,
      };
    }) ?? [];

  const onSave = async () => {
    try {
      const targetUsers = attendancesGroupedBySession
        ?.find((el) => el.sessionId === selectedSession.id)
        ?.attendances.map((el) => el.userId);
      if (!targetUsers) return;
      const req: EditAttendanceReq = {
        targets: targetUsers?.map((el) => {
          return {
            sessionId: selectedSession.id,
            userId: el,
            attendanceStatus: status as AttendanceStatusValueType,
          };
        }),
      };
      await mutateAsync(req);
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      onClose();
      setBundleEditCompletePopupOpen(true);
      setIsEdit(false);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        showErrorToast(error.response?.data.message ?? '');
      }
    }
  };

  return (
    <PopupContainer onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Typography variant="headline1Bold">일괄수정</Typography>
        <FlexBox direction="column" gap={24}>
          <FlexBox direction="column" gap={4}>
            <Typography variant="label1Normal">세션명</Typography>
            <Select
              optionList={sessionList}
              selectedValue={selectedSession.value}
              onChange={(value) => {
                console.log(value);
                const selected = sessionList?.find(
                  (el) => el.value === value,
                ) ?? { label: '', value: '', id: '' };
                setSelectedSession(selected);
              }}
            />
          </FlexBox>
          <FlexBox direction="column" gap={4}>
            <Typography variant="label1Normal">출석 상태</Typography>
            <Select
              optionList={attendanceOptions}
              selectedValue={status}
              onChange={(value: string) => setStatus(value)}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox gap={8}>
          <OutlinedButton size="xlarge" variant="secondary" onClick={onClose}>
            취소
          </OutlinedButton>
          <SolidButton
            disabled={!selectedSession || !status}
            size="xlarge"
            onClick={onSave}
          >
            저장
          </SolidButton>
        </FlexBox>
      </Container>
    </PopupContainer>
  );
};

export default BundleEditPopup;

const Container = styled.div`
  width: 555px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);

  button {
    flex: 1;
  }
`;
