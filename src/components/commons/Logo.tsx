import { FC } from 'react';
import styled from 'styled-components';

import { LogoNormal } from '@assets/LogoNomal';
import { LogoText } from '@assets/LogoText';

interface LogoProps {
  iconWidth?: string;
  iconHeight?: string;
  textWidth?: string;
  textHeight?: string;
}

const Logo: FC<LogoProps> = (props) => {
  const { iconWidth, iconHeight, textWidth, textHeight } = props;
  return (
    <Container>
      <LogoNormal height={iconHeight} width={iconWidth} />
      <LogoText height={textHeight} width={textWidth} />
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10.667px;
`;
