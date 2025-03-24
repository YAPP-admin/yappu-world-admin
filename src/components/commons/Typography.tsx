import { typography, TypographyType } from '@constants/typographyStyles';
import { FC, JSX, ReactNode } from 'react';
import styled, { css } from 'styled-components';
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
    <Styled as={as} $variant={variant} style={style} $color={color}>
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
