import { LogoNormal } from '@assets/LogoNomal';
import { LogoText } from '@assets/LogoText';
import { FC } from 'react';
import styled from 'styled-components';

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
      <LogoNormal width={iconWidth} height={iconHeight} />
      <LogoText width={textWidth} height={textHeight} />
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10.667px;
`;
