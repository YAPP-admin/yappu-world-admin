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
}

const Typography: FC<Props> = ({
  as = 'span',
  variant,
  children,
  style,
  color = 'static-black',
}) => {
  return (
    <Styled $color={color} $variant={variant} as={as} style={style}>
      {children}
    </Styled>
  );
};

export default Typography;

const Styled = styled.span<{
  $variant: TypographyType;
  $color: SemanticColorKey;
}>(({ $variant, $color }) => ({
  ...typography[$variant],
  color: semanticColor[$color],
}));
