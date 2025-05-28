import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useDeleteAttendanceCodeMutation } from '@queries/attendance/useDeleteAttendanceMutation';
import { useEditAttendanceCodeMutation } from '@queries/attendance/useEditAttendanceCodeMutation';
import { useAttendanceCodeStore } from '@stores/attendanceCodeStore';
import { EditAttendanceCodeReq } from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';
import { showErrorToast } from 'types/showErrorToast';

interface Props {
  code?: number;
  onClose: () => void;
}

const CodeEditPopup: FC<Props> = ({ code, onClose }) => {
  const [value, setValue] = useState(code?.toString());
  const {
    confirmPopupOpen,
    handleConfirmPopup,
    handleEditPopup,
    handleRefreshPopup,
    refreshPopup,
  } = useAttendanceCodeStore();
  const { mutateAsync: editCode } = useEditAttendanceCodeMutation();
  const { mutateAsync: deleteCode } = useDeleteAttendanceCodeMutation();
  const queryClient = useQueryClient();

  const onClickToSave = async () => {
    try {
      if (!value) return;
      const req: EditAttendanceCodeReq = {
        code: Number(value),
      };
      await editCode(req);
      queryClient.invalidateQueries({ queryKey: ['attendance-code'] });
      handleConfirmPopup(false);
      handleEditPopup(false);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  const onClickToDelete = async () => {
    try {
      await deleteCode();
      queryClient.invalidateQueries({ queryKey: ['attendance-code'] });
      handleRefreshPopup(false);
      handleEditPopup(false);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  return (
    <>
      <PopupContainer onClose={onClose}>
        <Container onClick={(e) => e.stopPropagation()}>
          <FlexBox justify="space-between">
            <Typography color="label-normal" variant="headline1Bold">
              출석코드값 수정
            </Typography>
          </FlexBox>
          <FlexBox direction="column" gap={8}>
            <TextInput
              maxLength={4}
              value={value}
              onChange={(e) => {
                const filtered = e.target.value.replace(/\D/g, '');
                setValue(filtered);
              }}
            />
            <Typography variant="label1Regular">
              출석코드는 4자리 숫자입니다.
            </Typography>
          </FlexBox>
          <ButtonWrapper>
            <SolidButton
              size="xlarge"
              type="button"
              variant="secondary"
              onClick={() => handleRefreshPopup(true)}
            >
              초기화
            </SolidButton>
            <SolidButton
              size="xlarge"
              type="button"
              onClick={() => handleConfirmPopup(true)}
            >
              저장
            </SolidButton>
          </ButtonWrapper>
        </Container>
      </PopupContainer>
      {confirmPopupOpen && (
        <ConfirmPopup
          comment="수정된 값으로 출석코드값을 저장할까요?"
          confirmActionLabel="저장"
          title="출석코드값 저장"
          onCancelAction={() => handleConfirmPopup(false)}
          onConfirmAction={onClickToSave}
        />
      )}
      {refreshPopup && (
        <ConfirmPopup
          comment="입력하신 출석코드값을 초기화할까요?"
          confirmActionLabel="초기화"
          title="출석코드값 초기화"
          onCancelAction={() => handleRefreshPopup(false)}
          onConfirmAction={onClickToDelete}
        />
      )}
    </>
  );
};

export default CodeEditPopup;

const Container = styled.div`
  display: flex;
  width: 396px;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;

  button {
    flex: 1;
  }
`;
