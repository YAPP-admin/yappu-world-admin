import { FC, JSX, ReactNode } from 'react';
import styled from 'styled-components';

import { typography, TypographyType } from '@constants/typographyStyles';
import { semanticColor, SemanticColorKey } from 'styles/colors/semantic';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyType;
  color?: SemanticColorKey;
  children: ReactNode;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
}

const Typography: FC<Props> = ({
  as = 'span',
  variant,
  children,
  style,
  color = 'static-black',
  align = 'left',
}) => {
  return (
    <Styled
      $align={align}
      $color={color}
      $variant={variant}
      as={as}
      style={style}
    >
      {children}
    </Styled>
  );
};

export default Typography;

const Styled = styled.span<{
  $variant: TypographyType;
  $color: SemanticColorKey;
  $align?: 'left' | 'center' | 'right';
}>(({ $variant, $color, $align }) => ({
  ...typography[$variant],
  color: semanticColor[$color],
  whiteSpace: 'pre-line',
  textAlign: $align,
}));
