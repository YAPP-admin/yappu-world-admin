import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import { userRoleOptionList } from '@constants/optionList';
import { useUserDetailMutation } from '@queries/user/useUserDetailMutation';
import { useUserProfileQuery } from '@queries/user/useUserProfileQuery';
import { useAuthStore } from '@stores/authStore';
import { ErrorResponse } from 'apis/common/types';
import { RoleLabel, UserDetailReq, UserDetailRes } from 'apis/user/types';
import { MemberFormSchema, MemberFormType } from 'schema/MemberFormSchema';
import theme from 'styles/theme';
import { showErrorToast } from 'types/showErrorToast';

import MemberActivityForm from './MemberActivityForm';
import MemberBasicForm from './MemberBasicForm';

interface Props {
  cancelToEdit: () => void;
  userInfo: UserDetailRes | undefined;
}

const MemberForm: FC<Props> = (props) => {
  const { cancelToEdit, userInfo } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<MemberFormType | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync } = useUserDetailMutation();
  const { refetch } = useUserProfileQuery();
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const method = useForm<MemberFormType>({
    resolver: zodResolver(MemberFormSchema),
    defaultValues: userInfo
      ? {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          gender: userInfo.gender,
          activityUnits: userInfo.activityUnits,
          role: userRoleOptionList?.find((li) => li.label === userInfo.role)
            ?.value,
          registrationDate: userInfo.registrationDate,
        }
      : undefined,
  });

  const onSubmit = (data: MemberFormType) => {
    setOpenConfirm(true);
    setFormData({
      id: data.id,
      name: data.name,
      email: data.email,
      activityUnits: data.activityUnits.map((el) => ({
        ...el,
        position: el.position.toUpperCase(),
      })),
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      role: data.role,
      registrationDate: data.registrationDate,
    });
  };

  const cancelToSave = () => {
    setFormData(null);
    setOpenConfirm(false);
  };

  const putUserDetail = async () => {
    if (!formData) return;

    const req: UserDetailReq = {
      userId: formData.id,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber ?? null,
      gender: formData.gender ?? null,
      role: formData.role as RoleLabel,
      activityUnits: formData.activityUnits,
    };

    try {
      await mutateAsync(req);
      setOpenConfirm(false);
      cancelToEdit();
      queryClient.invalidateQueries({
        queryKey: ['user-detail', userInfo?.id],
      });
      const { data: profileData } = await refetch();
      if (profileData) {
        setUserProfile(profileData);
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        showErrorToast(
          error.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
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
