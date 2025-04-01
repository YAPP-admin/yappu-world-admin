import SolidButton from '@compnents/Button/SolidButton';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  comment: string;
  onClose: () => void;
  buttonText?: string;
}

const CompletePopup: FC<Props> = (props) => {
  const { title, comment, onClose, buttonText = '확인' } = props;
  return (
    <PopupContainer onClose={onClose}>
      <Container>
        <Wrapper>
          <Typography variant="headline1Bold">{title}</Typography>
          <Typography variant="label1Reading" color="label-neutral">
            {comment}
          </Typography>
        </Wrapper>
        <SolidButton onClick={onClose} variant="secondary" size="xlarge">
          {buttonText}
        </SolidButton>
      </Container>
    </PopupContainer>
  );
};

export default CompletePopup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.3);
  /* backdrop-filter: blur(32px); */
  width: 396px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
