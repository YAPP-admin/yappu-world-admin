import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Select from '@compnents/commons/Select';
import Typography from '@compnents/commons/Typography';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import PopupContainer from '@compnents/popup/PopupContainer';
import { userRole } from '@constants/role';
import { useApplicationApproveMutation } from '@queries/auth/useApplicationApproveMutation';
import { useApplicationStore } from '@stores/applicationStore';
import { ApplicationApproveReq, ApplicationListRes } from 'apis/auth/types';
import { RoleLabel } from 'apis/user/types';
import theme from 'styles/theme';

interface Props {
  onClose: () => void;
  selectedList?: ApplicationListRes | null;
  selectedIndexes?: string[];
  isBulk?: boolean;
}

interface ApplicationApproveType {
  ids: string[];
  role: RoleLabel;
}

const ApprovePopup: FC<Props> = ({
  onClose,
  selectedList,
  selectedIndexes,
  isBulk = false,
}) => {
  const { handleSubmit, control, watch } = useForm<ApplicationApproveType>({
    defaultValues: {
      ids: isBulk ? selectedIndexes : [selectedList?.applicationId],
      role: undefined,
    },
  });
  const { mutate } = useApplicationApproveMutation();
  const setIsApproveCompletePopup = useApplicationStore(
    (state) => state.setIsApproveCompletePopup,
  );
  const isApproveConfirmPopup = useApplicationStore(
    (state) => state.isApproveConfirmPopup,
  );
  const setIsApproveConfirmPopup = useApplicationStore(
    (state) => state.setIsApproveConfirmPopup,
  );
  const setIsDetailPopup = useApplicationStore(
    (state) => state.setIsDetailPopup,
  );
  const [approveData, setApproveData] = useState<ApplicationApproveType | null>(
    null,
  );

  const onSumbit = (data: ApplicationApproveType) => {
    if (isBulk) {
      setApproveData(data);
      setIsApproveConfirmPopup(true);
      return;
    }
    const req: ApplicationApproveReq = {
      applicationIds: data.ids,
      role: userRole.find((el) => el.label === data.role)?.name ?? '',
    };
    mutate(req);
    onClose();
    setIsDetailPopup(false);
    setIsApproveCompletePopup(true);
  };

  const handleBulkConfirm = () => {
    if (!approveData) return;

    const req: ApplicationApproveReq = {
      applicationIds: approveData.ids,
      role: userRole.find((el) => el.label === approveData.role)?.name ?? '',
    };
    mutate(req);
    setIsApproveConfirmPopup(false);
    onClose();
    setIsApproveCompletePopup(true);
  };

  return (
    <>
      <PopupContainer onClose={onClose}>
        <Container
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSumbit)}
        >
          <FlexBox direction="column" gap={8}>
            {isBulk ? (
              <Typography color="label-normal" variant="headline1Bold">
                가입 승인
              </Typography>
            ) : (
              <Typography color="label-normal" variant="headline1Bold">
                <Typography color="primary-normal" variant="headline1Bold">
                  {selectedList?.name}
                </Typography>
                님 가입을 승인합니다.
              </Typography>
            )}

            <Typography color="label-neutral" variant="label1Reading">
              회원 역할을 선택해주세요.
            </Typography>
          </FlexBox>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                selectedValue={field.value}
                size="large"
                optionList={[
                  '관리자',
                  '운영진',
                  '정회원',
                  '수료회원',
                  '활동회원',
                ]}
                onChange={field.onChange}
              />
            )}
          />
          <FlexBox gap={8}>
            <OutlinedButton size="xlarge" variant="assistive" onClick={onClose}>
              취소
            </OutlinedButton>
            <SolidButton disabled={!watch('role')} size="xlarge" type="submit">
              승인
            </SolidButton>
          </FlexBox>
        </Container>
      </PopupContainer>
      {isApproveConfirmPopup && (
        <ConfirmPopup
          comment={`한번 승인하면 변경할 수 없습니다.\n선택한 ${selectedIndexes?.length}명의 가입을 승인하시겠습니까?`}
          confirmActionLabel="승인"
          title="가입 승인"
          onCancelAction={() => setIsApproveConfirmPopup(false)}
          onConfirmAction={handleBulkConfirm}
        />
      )}
    </>
  );
};

export default ApprovePopup;

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
