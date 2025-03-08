import { LogoNormal } from '@assets/LogoNomal';
import { LogoText } from '@assets/LogoText';
import { FC } from 'react';
import styled from 'styled-components';

const Logo: FC = () => {
  return (
    <Container>
      <LogoNormal width="32" height="32" />
      <LogoText width="64.2" height="16.8" />
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10.667px;
`;
