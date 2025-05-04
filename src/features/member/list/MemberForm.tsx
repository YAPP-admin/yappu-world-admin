import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import { useUserDetailMutation } from '@queries/user/useUserDetailMutation';
import { ErrorResponse } from 'apis/common/types';
import { UserDetailRes } from 'apis/user/types';
import theme from 'styles/theme';
import { UserDetailType } from 'types/formTypes';

import MemberActivityForm from './MemberActivityForm';
import MemberBasicForm from './MemberBasicForm';

interface Props {
  cancelToEdit: () => void;
  userInfo: UserDetailRes | undefined;
}

const MemberForm: FC<Props> = (props) => {
  const { cancelToEdit, userInfo } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<UserDetailType | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync } = useUserDetailMutation();

  const method = useForm<UserDetailType>({
    defaultValues: userInfo ?? {},
  });

  const onSubmit = (data: UserDetailType) => {
    setOpenConfirm(true);
    setFormData({
      id: data.id,
      name: data.name,
      email: data.email,
      activityUnits: data.activityUnits,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    });
  };

  const cancelToSave = () => {
    setFormData(null);
    setOpenConfirm(false);
  };

  const putUserDetail = async () => {
    if (!formData) return;

    try {
      await mutateAsync(formData);
      setOpenConfirm(false);
      cancelToEdit();
      queryClient.invalidateQueries({ queryKey: ['user-list'] });
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <FormProvider {...method}>
      <Container
        onClick={(e) => e.stopPropagation()}
        onSubmit={method.handleSubmit(onSubmit)}
      >
        <Wrapper>
          <MemberBasicForm />
          <MemberActivityForm />
        </Wrapper>
        <ButtonWrapper>
          <OutlinedButton
            size="medium"
            type="button"
            variant="assistive"
            onClick={cancelToEdit}
          >
            취소
          </OutlinedButton>
          <SolidButton size="medium" type="submit">
            저장
          </SolidButton>
        </ButtonWrapper>
      </Container>
      {openConfirm && (
        <ConfirmPopup
          cancelActionLabel="취소"
          comment="수정한 내용으로 회원 정보를 저장할까요?"
          confirmActionLabel="저장"
          title="회원 정보 저장"
          onCancelAction={cancelToSave}
          onConfirmAction={putUserDetail}
        />
      )}
    </FormProvider>
  );
};

export default MemberForm;

const Container = styled.form``;

const Wrapper = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 24px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 24px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  border-top: 1px solid ${theme.colors.lineNormal.alternative};
  background: ${theme.colors.backgroundElevated.normal};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
