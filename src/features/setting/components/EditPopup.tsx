import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useOperationMutation } from '@queries/operation/useOperationMutation';
import { OperationListInfo } from 'apis/operation/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  linkInfo: OperationListInfo;
  onClose: () => void;
  setIsEditCompletePopupOpen: () => void;
}

const EditPopup: FC<Props> = (props) => {
  const { linkInfo, onClose, setIsEditCompletePopupOpen } = props;
  const { register, handleSubmit } = useForm<OperationListInfo>({
    defaultValues: linkInfo,
  });
  const { mutate } = useOperationMutation();

  const onSubmit = (data: OperationListInfo) => {
    console.log(data);
    mutate(data);
    onClose();
    setIsEditCompletePopupOpen();
  };

  return (
    <PopupContainer onClose={onClose}>
      <Container
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="headline1Bold">링크 수정</Typography>
        <InputWrapper>
          <TextInput title={'링크 이름'} {...register('label')} disabled />
          <TextInput title={'URL'} {...register('value')} />
        </InputWrapper>
        <ButtonWrapper>
          <OutlinedButton onClick={onClose} variant="secondary" size="xlarge">
            취소
          </OutlinedButton>
          <SolidButton size="xlarge" buttonType="submit">
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
