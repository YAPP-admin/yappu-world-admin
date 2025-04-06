import { FC } from 'react';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';

interface Props {
  onClose: () => void;
  onSave: () => void;
}

const CodeEditConfirmPopup: FC<Props> = ({ onClose, onSave }) => {
  return (
    <PopupContainer onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TitleWrapper>
          <Typography color="label-normal" variant="headline1Bold">
            코드값 저장
          </Typography>
          <Typography color="label-neutral" variant="label1Reading">
            수정된 값으로 코드값을 저장할까요?
          </Typography>
        </TitleWrapper>
        <ButtonWrapper>
          <OutlinedButton size="xlarge" variant="secondary" onClick={onClose}>
            취소
          </OutlinedButton>
          <SolidButton size="xlarge" onClick={onSave}>
            저장
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default CodeEditConfirmPopup;

const Container = styled.div`
  width: 396px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(32px);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;

  button {
    flex: 1;
  }
`;
