import { FC } from 'react';
import PopupContainer from './PopupContainer';
import styled from 'styled-components';
import Typography from '@compnents/commons/Typography';
import Chip from '@compnents/commons/Chip';
import TextInput from '@compnents/commons/TextInput';
import Button from '@compnents/commons/Button';
import CodeEditConfirmPopup from './CodeEditConfirmPopup';
import { UserRole } from 'apis/user/types';

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
          <Typography variant="headline1Bold" color="label-normal">
            코드값 수정
          </Typography>
          <Chip size="large" variant="weak" text={role?.label} />
          <TextInput value={code} onChange={(e) => onChange(e.target.value)} />
          <ButtonWrapper>
            <Button
              text="초기화"
              buttonSize="xlarge"
              variantType="secondary"
              onClick={() => onChange('')}
            />
            <Button
              text="저장"
              buttonSize="xlarge"
              onClick={handleConfirmPopup}
            />
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
