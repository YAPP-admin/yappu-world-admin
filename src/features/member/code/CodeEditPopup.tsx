import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import Chip from '@compnents/commons/Chip';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useDeleteMemberCodeMutation } from '@queries/auth/useDeleteMemberCodeMutation';
import { useMemberCodeMutation } from '@queries/auth/useMemberCodeMutation';
import { useMemberCodeStore } from '@stores/memberCodeStore';
import {
  DeleteMemberCodeReq,
  MemberCodeInfo,
  MemberCodeReq,
} from 'apis/auth/types';
import { ErrorResponse } from 'apis/common/types';
import { RoleName } from 'apis/user/types';
import { UserRoleType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

import CodeEditConfirmPopup from './CodeEditConfirmPopup';
import PopupContainer from '../../../components/popup/PopupContainer';

interface Props {
  confirmPopupOpen: boolean;
  selectedCode: MemberCodeInfo | null;
}

const CodeEditPopup: FC<Props> = (props) => {
  const { selectedCode, confirmPopupOpen } = props;
  const { mutateAsync: codeEdit } = useMemberCodeMutation();
  const { mutateAsync: codeDelete } = useDeleteMemberCodeMutation();
  const { handleSubmit, register } = useForm<UserRoleType>({
    defaultValues: {
      name: selectedCode?.role?.name,
      code: selectedCode?.code,
    },
  });
  const queryClient = useQueryClient();
  const handleEditPopup = useMemberCodeStore((state) => state.handleEditPopup);
  const handleConfirmPopup = useMemberCodeStore(
    (state) => state.handleConfirmPopup,
  );
  const [formData, setFormData] = useState<UserRoleType | null>(null);

  const onSubmit = (data: UserRoleType) => {
    setFormData(data);
    handleConfirmPopup(true);
  };

  const onDelete = async () => {
    const req: DeleteMemberCodeReq = {
      role: selectedCode?.role?.name as RoleName,
    };
    try {
      await codeDelete(req);
      queryClient.invalidateQueries({ queryKey: ['member-code-list'] });
      handleEditPopup(false);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  const onSave = async () => {
    if (!formData) return;
    const req: MemberCodeReq = {
      role: formData.name as RoleName,
      code: formData?.code.toString(),
    };
    try {
      await codeEdit(req);
      handleConfirmPopup(false);
      handleEditPopup(false);
      queryClient.invalidateQueries({ queryKey: ['member-code-list'] });
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
      <PopupContainer onClose={() => handleEditPopup(false)}>
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
              onClick={onDelete}
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
        <CodeEditConfirmPopup
          onClose={() => handleConfirmPopup(false)}
          onSave={onSave}
        />
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
