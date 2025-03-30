import { FC } from 'react';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';

import PopupContainer from './PopupContainer';

interface Props {
  title: string;
  comment: string;
  confirmActionLabel: string;
  cancelActionLabel: string;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}

const ConfirmPopup: FC<Props> = (props) => {
  const {
    title,
    comment,
    confirmActionLabel,
    cancelActionLabel,
    onConfirmAction,
    onCancelAction,
  } = props;

  return (
    <PopupContainer onClose={onCancelAction}>
      <Container>
        <Contents>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="heading2Bold"
          >
            {title}
          </Typography>
          <Typography color="label-neutral" variant="label1Normal">
            {comment}
          </Typography>
        </Contents>
        <ButtonWrapper>
          <OutlinedButton
            size="xlarge"
            variant="secondary"
            onClick={onCancelAction}
          >
            {cancelActionLabel}
          </OutlinedButton>
          <SolidButton size="xlarge" onClick={onConfirmAction}>
            {confirmActionLabel}
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default ConfirmPopup;

const Container = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 20px;
  background: ${theme.colors.backgroundNormal.normal};
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  width: 396px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    flex: 1;
  }
`;
