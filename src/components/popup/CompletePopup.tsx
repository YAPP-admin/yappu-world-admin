import { FC } from 'react';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';

interface Props {
  title: string;
  comment: string;
  buttonText: string;
  onClose: () => void;
}

const CompletePopup: FC<Props> = (props) => {
  const { title, comment, buttonText, onClose } = props;
  return (
    <PopupContainer onClose={onClose}>
      <Container>
        <Wrapper>
          <Typography variant="headline1Bold">{title}</Typography>
          <Typography color="label-neutral" variant="label1Reading">
            {comment}
          </Typography>
        </Wrapper>
        <SolidButton size="xlarge" variant="secondary" onClick={onClose}>
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
