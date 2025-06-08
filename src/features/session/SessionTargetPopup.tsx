import { FC } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';

interface Props {
  onClose: () => void;
}

const SessionTargetPopup: FC<Props> = ({ onClose }) => {
  return (
    <PopupContainer onClose={onClose}>
      <Container>
        <FlexBox justify="space-between" padding="24px">
          <Typography variant="headline1Bold">세션 대상 선택</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </FlexBox>
        <ButtonWrapper>
          <SolidButton size="xlarge">N명 선택 완료</SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default SessionTargetPopup;

const Container = styled.div`
  display: flex;
  width: 586px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  background: #fff;

  div {
    box-sizing: border-box;
  }
`;

const ButtonWrapper = styled.div`
  padding: 24px;
  button {
    width: 100%;
  }
`;
