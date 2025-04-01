import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Calendar from '@compnents/commons/Calendar';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import Switch from '@compnents/Control/Switch';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useAddGenerationMutation } from '@queries/operation/useAddGenerationMutation';
import { AddGenerationReq } from 'apis/operation/types';

interface Props {
  onClose: () => void;
  handleAddCompletePopupOpen: (value: boolean) => void;
}

const AddGenerationPopup: FC<Props> = (props) => {
  const { onClose, handleAddCompletePopupOpen } = props;
  const method = useForm<AddGenerationReq>({
    defaultValues: {
      generation: null,
      startDate: null,
      endDate: null,
      isActive: false,
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useAddGenerationMutation();

  const onSubmit = (data: AddGenerationReq) => {
    console.log('onSubmit data :', data);
    mutate(data);
    queryClient.invalidateQueries({ queryKey: ['generation-list'] });
    onClose();
    handleAddCompletePopupOpen(true);
  };

  return (
    <FormProvider {...method}>
      <PopupContainer onClose={onClose}>
        <Container
          onClick={(e) => e.stopPropagation()}
          onSubmit={method.handleSubmit(onSubmit)}
        >
          <Typography variant="headline1Bold">기수 추가</Typography>
          <FlexBox direction="column" gap={24}>
            <TextInput
              title="기수"
              {...method.register('generation')}
              placeholder="00기"
            />
            <FlexBox gap={16}>
              <Calendar label="활동 시작일" name="startDate" />
              <Calendar label="활동 종료일" name="endDate" />
            </FlexBox>
            <FlexBox direction="column" gap={8}>
              <Typography color="label-normal" variant="label1Normal">
                상태
              </Typography>
              <FlexBox justify="space-between">
                <Typography variant="body1Normal">활동중</Typography>
                <Controller
                  control={method.control}
                  name="isActive"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      disabled={false}
                      onToggle={() => field.onChange(!field.value)}
                    />
                  )}
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox gap={8}>
            <OutlinedButton size="xlarge" variant="secondary" onClick={onClose}>
              취소
            </OutlinedButton>
            <SolidButton
              size="xlarge"
              type="submit"
              disabled={
                !(
                  method.watch('generation') &&
                  method.watch('startDate') &&
                  method.watch('endDate')
                )
              }
            >
              저장
            </SolidButton>
          </FlexBox>
        </Container>
      </PopupContainer>
    </FormProvider>
  );
};

export default AddGenerationPopup;

const Container = styled.form`
  width: 555px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(32px);
  button {
    flex: 1;
  }
`;
