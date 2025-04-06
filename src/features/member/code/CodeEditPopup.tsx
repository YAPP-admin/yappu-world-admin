import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import Chip from '@compnents/commons/Chip';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useMemberCodeMutation } from '@queries/auth/useMemberCodeMutation';
import { MemberCodeInfo, MemberCodeReq } from 'apis/auth/types';
import { RoleName } from 'apis/user/types';
import { UserRoleType } from 'types/formTypes';

import CodeEditConfirmPopup from './CodeEditConfirmPopup';
import PopupContainer from '../../../components/popup/PopupContainer';

interface Props {
  handleEditPopup: () => void;
  handleConfirmPopup: () => void;
  confirmPopupOpen: boolean;
  selectedCode: MemberCodeInfo | null;
}

const CodeEditPopup: FC<Props> = (props) => {
  const {
    handleEditPopup,
    selectedCode,
    handleConfirmPopup,
    confirmPopupOpen,
  } = props;
  const { mutate } = useMemberCodeMutation();
  const { handleSubmit, register, setValue } = useForm<UserRoleType>({
    defaultValues: {
      name: selectedCode?.role?.name,
      code: selectedCode?.code,
    },
  });

  const [formData, setFormData] = useState<UserRoleType | null>(null);

  const onSubmit = (data: UserRoleType) => {
    setFormData(data);
    handleConfirmPopup();
  };

  const onSave = () => {
    if (!formData) return;
    const req: MemberCodeReq = {
      role: formData.name as RoleName,
      code: formData?.code.toString(),
    };
    mutate(req);
  };

  return (
    <>
      <PopupContainer onClose={handleEditPopup}>
        <Container
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography color="label-normal" variant="headline1Bold">
            코드값 수정
          </Typography>
          <Chip
            role={selectedCode?.role?.name}
            size="large"
            text={selectedCode?.role?.label}
            variant="weak"
          />
          <TextInput
            {...register('code', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              },
            })}
            maxLength={6}
          />
          <ButtonWrapper>
            <SolidButton
              size="xlarge"
              type="button"
              variant="secondary"
              onClick={() => setValue('code', '')}
            >
              초기화
            </SolidButton>
            <SolidButton size="xlarge" type="submit">
              저장
            </SolidButton>
          </ButtonWrapper>
        </Container>
      </PopupContainer>
      {confirmPopupOpen && (
        <CodeEditConfirmPopup onClose={handleConfirmPopup} onSave={onSave} />
      )}
    </>
  );
};

export default CodeEditPopup;

const Container = styled.form`
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
