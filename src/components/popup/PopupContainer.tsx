import { FC } from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

interface Props {
  onClose?: () => void;
  children: React.ReactNode;
}

const PopupContainer: FC<Props> = (props) => {
  const { onClose, children } = props;

  return (
    <Container onClick={onClose}>
      <Backdrop />
      {children}
    </Container>
  );
};

export default PopupContainer;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.materialDimmer.alert};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  z-index: -1;
  background: ${theme.colors.materialDimmer.alert};
`;
