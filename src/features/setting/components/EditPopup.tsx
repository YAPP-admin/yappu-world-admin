import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useOperationMutation } from '@queries/operation/useOperationMutation';
import { OperationEditReq, OperationListInfo } from 'apis/operation/types';
import { OperationListType } from 'types/formTypes';

interface Props {
  linkInfo: OperationListInfo;
  onClose: () => void;
}

const EditPopup: FC<Props> = (props) => {
  const { linkInfo, onClose } = props;
  const { mutate } = useOperationMutation();
  const { register, handleSubmit, setValue, watch } =
    useForm<OperationListType>({
      defaultValues: {
        id: linkInfo.id,
        name: linkInfo.label,
        link: linkInfo.value,
      },
    });

  const onSubmit = (data: OperationEditReq) => {
    mutate(data);
  };

  return (
    <PopupContainer onClose={onClose}>
      <Container
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="headline1Bold">링크 수정</Typography>
        <InputWrapper>
          <TextInput title={'링크 이름'} {...register('name')} disabled />
          <TextInput
            title={'URL'}
            {...register('link', { required: true })}
            remove
            onRemove={() => setValue('link', '')}
          />
        </InputWrapper>
        <ButtonWrapper>
          <OutlinedButton size="xlarge" variant="secondary" onClick={onClose}>
            취소
          </OutlinedButton>
          <SolidButton disabled={!watch('link')} size="xlarge" type="submit">
            저장
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default EditPopup;

const Container = styled.form`
  display: flex;
  width: 555px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    flex: 1;
  }
`;
