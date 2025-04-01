import { FC } from 'react';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import Chip from '@compnents/commons/Chip';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { UserRole } from 'apis/user/types';

import CodeEditConfirmPopup from './CodeEditConfirmPopup';
import PopupContainer from './PopupContainer';

interface Props {
  handleEditPopup: () => void;
  role: UserRole | null;
  code: string;
  onChange: (value: string) => void;
  handleConfirmPopup: () => void;
  confirmPopupOpen: boolean;
  onSave: () => void;
}

const CodeEditPopup: FC<Props> = (props) => {
  const {
    handleEditPopup,
    role,
    code,
    onChange,
    handleConfirmPopup,
    confirmPopupOpen,
    onSave,
  } = props;

  return (
    <>
      <PopupContainer onClose={handleEditPopup}>
        <Container onClick={(e) => e.stopPropagation()}>
          <Typography color="label-normal" variant="headline1Bold">
            코드값 수정
          </Typography>
          <Chip size="large" text={role?.label} variant="weak" />
          <TextInput value={code} onChange={(e) => onChange(e.target.value)} />
          <ButtonWrapper>
            <SolidButton
              size="xlarge"
              variant="secondary"
              onClick={() => onChange('')}
            >
              초기화
            </SolidButton>
            <SolidButton size="xlarge" onClick={handleConfirmPopup}>
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

const Container = styled.div`
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
