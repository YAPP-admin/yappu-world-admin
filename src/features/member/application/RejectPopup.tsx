import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorResponse } from 'react-router-dom';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Select from '@compnents/commons/Select';
import TextInputBox from '@compnents/commons/TextInputBox';
import Typography from '@compnents/commons/Typography';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import PopupContainer from '@compnents/popup/PopupContainer';
import { rejectOptionList } from '@constants/optionList';
import { useApplicationStore } from '@stores/applicationStore';
import { ApplicationListRes } from 'apis/auth/types';
import theme from 'styles/theme';

import { useApplicationRejectMutaion } from '../../../queries/auth/useApplicationRejectMutation';

interface Props {
  onClose?: () => void;
  selectedList?: ApplicationListRes | null;
  selectedIndexes?: string[];
  isBulk?: boolean;
}

interface ApplicationRefuseType {
  applicationIds: string[];
  reason: string;
}

const RejectPopup: FC<Props> = ({
  onClose,
  selectedList,
  selectedIndexes,
  isBulk = false,
}) => {
  const { handleSubmit, register, watch } = useForm<ApplicationRefuseType>({
    defaultValues: {
      applicationIds: isBulk ? selectedIndexes : [selectedList?.id],
      reason: '',
    },
  });

  const { mutateAsync } = useApplicationRejectMutaion();
  const queryClient = useQueryClient();
  const setIsRejectCompletePopup = useApplicationStore(
    (state) => state.setIsRejectCompletePopup,
  );
  const isRejectConfirmPopup = useApplicationStore(
    (state) => state.isRejectConfirmPopup,
  );
  const setIsRejectConfirmPopup = useApplicationStore(
    (state) => state.setIsRejectConfirmPopup,
  );
  const setIsDetailPopup = useApplicationStore(
    (state) => state.setIsDetailPopup,
  );
  const setSelectedIndexes = useApplicationStore(
    (state) => state.setSelectedIndexes,
  );
  const page = useApplicationStore((state) => state.page);

  const [approveData, setApproveData] = useState<ApplicationRefuseType | null>(
    null,
  );

  const onSubmit = async (data: ApplicationRefuseType) => {
    console.log(data);
    if (isBulk) {
      setApproveData(data);
      setIsRejectConfirmPopup(true);
      return;
    }

    const req: ApplicationRefuseType = {
      applicationIds: data.applicationIds,
      reason: data.reason,
    };

    try {
      await mutateAsync(req);
      queryClient.invalidateQueries({ queryKey: ['application-list', page] });
      onClose?.();
      setIsDetailPopup(false);
      setIsRejectCompletePopup(true);
      setSelectedIndexes([]);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.error('Approve error:', error.response?.data);
      }
    }
  };

  const handleBulkConfirm = async () => {
    if (!approveData) return;

    const req: ApplicationRefuseType = {
      applicationIds: approveData.applicationIds,
      reason: approveData.reason,
    };

    try {
      await mutateAsync(req);
      queryClient.invalidateQueries({ queryKey: ['application-list', page] });

      setIsRejectConfirmPopup(false);
      onClose?.();
      setIsRejectCompletePopup(true);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.error('Bulk Approve error:', error.response?.data);
      }
    }
  };

  return (
    <>
      <PopupContainer onClose={onClose}>
        <Container
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FlexBox direction="column" gap={8}>
            {isBulk ? (
              <Typography color="label-normal" variant="headline1Bold">
                가입 거절
              </Typography>
            ) : (
              <Typography color="label-normal" variant="headline1Bold">
                <Typography color="primary-normal" variant="headline1Bold">
                  {selectedList?.name}
                </Typography>
                님 가입을 거절합니다.
              </Typography>
            )}

            <Typography color="label-neutral" variant="label1Reading">
              거절 사유를 선택해주세요.
            </Typography>
          </FlexBox>
          <Select
            optionList={rejectOptionList}
            selectedValue={'직접입력'}
            size="large"
          />
          <TextInputBox {...register('reason')} width="100%" />
          <FlexBox gap={8}>
            <OutlinedButton size="xlarge" variant="assistive" onClick={onClose}>
              취소
            </OutlinedButton>
            <SolidButton
              disabled={!watch('reason')}
              size="xlarge"
              type="submit"
            >
              거절
            </SolidButton>
          </FlexBox>
        </Container>
      </PopupContainer>
      {isRejectConfirmPopup && (
        <ConfirmPopup
          comment={`한번 승인하면 변경할 수 없습니다.\n선택한 ${selectedIndexes?.length}명의 가입을 거절하시겠습니까?`}
          confirmActionLabel="거절"
          title="가입 거절"
          onCancelAction={() => setIsRejectConfirmPopup(false)}
          onConfirmAction={handleBulkConfirm}
        />
      )}
    </>
  );
};

export default RejectPopup;

const Container = styled.form`
  width: 396px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  border-radius: 20px;
  background: ${theme.colors.backgroundNormal.normal};
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(32px);

  button {
    flex: 1;
  }
`;
