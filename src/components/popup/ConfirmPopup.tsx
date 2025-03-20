import { FC } from 'react';
import Backdrop from './Backdrop';
import styled from 'styled-components';
import theme from 'styles/theme';
import Typography from '@compnents/commons/Typography';
import Button from '@compnents/commons/Botton';

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
    <Backdrop>
      <Container>
        <Contents>
          <Typography
            children={title}
            variant="heading2Bold"
            style={{ color: theme.colors.label.normal }}
          />
          <Typography
            children={comment}
            variant="label1Normal"
            style={{ color: theme.colors.label.neutral }}
          />
        </Contents>
        <ButtonWrapper>
          <Button
            text={cancelActionLabel}
            onClick={onCancelAction}
            variant="outlined"
          />
          <Button text={confirmActionLabel} onClick={onConfirmAction} />
        </ButtonWrapper>
      </Container>
    </Backdrop>
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
