import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useSupportVersionMutation } from '@queries/operation/useSupportVersionMutation';
import { useSupportVersionStore } from '@stores/supportVersionStore';
import { PlatformReqType } from 'apis/operation/types';
import { SupportVersionType } from 'types/formTypes';

interface Props {
  onClose: () => void;
}

const EditVersionPopup: FC<Props> = ({ onClose }) => {
  const { mutateAsync } = useSupportVersionMutation();
  const selectedVersionInfo = useSupportVersionStore(
    (state) => state.selectedVersionInfo,
  );
  const setIsEditPopupOpen = useSupportVersionStore(
    (state) => state.setIsEditPopupOpen,
  );
  const setIsEditCompletePopupOpen = useSupportVersionStore(
    (state) => state.setIsEditCompletePopupOpen,
  );
  const queryClient = useQueryClient();
  console.log(selectedVersionInfo?.platform.toUpperCase());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SupportVersionType>({
    defaultValues: {
      platform: selectedVersionInfo?.platform.toUpperCase() as PlatformReqType,
      version: '',
    },
  });

  const onSubmit = async (data: SupportVersionType) => {
    console.log('data :', data);

    try {
      await mutateAsync(data);
      setIsEditPopupOpen(false);
      setIsEditCompletePopupOpen(true);
      queryClient.invalidateQueries({ queryKey: ['support-version'] });
    } catch (err) {
      console.log('err :', err);
    }
  };

  return (
    <PopupContainer onClose={onClose}>
      <Container
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FlexBox direction="column" gap={8}>
          <Typography variant="headline1Bold">
            강제 업데이트를 진행합니다.
          </Typography>
          <Typography color="label-neutral" variant="label1Reading">
            강제 업데이트할 버전을 입력해 주세요.
          </Typography>
        </FlexBox>
        <FlexBox direction="column" gap={5}>
          <TextInput
            {...register('version', {
              pattern: {
                value: /^\d+(?:\.\d+)+$/,
                message: '유효하지 않은 입력값입니다.',
              },
            })}
          />
          {errors.version && (
            <Typography color="status-negative" variant="caption1Regular">
              {errors.version.message}
            </Typography>
          )}
        </FlexBox>
        <ButtonWrapper>
          <OutlinedButton size="xlarge" variant="secondary" onClick={onClose}>
            취소
          </OutlinedButton>
          <SolidButton disabled={!watch('version')} size="xlarge" type="submit">
            강제 업데이트
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default EditVersionPopup;

const Container = styled.form`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  width: 396px;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    flex: 1;
  }
`;
