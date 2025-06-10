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
  ellipsis?: boolean;
  fontWeight?: number | string;
}

const Typography: FC<Props> = ({
  as = 'span',
  variant,
  children,
  style,
  color = 'static-black',
  align = 'left',
  ellipsis = false,
  fontWeight,
}) => {
  return (
    <Styled
      $align={align}
      $color={color}
      $ellipsis={ellipsis}
      $fontWeight={fontWeight}
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
  $ellipsis?: boolean;
  $fontWeight?: number | string;
}>(({ $variant, $color, $align, $ellipsis, $fontWeight }) => ({
  ...typography[$variant],
  color: semanticColor[$color],
  textAlign: $align,
  whiteSpace: $ellipsis ? 'nowrap' : 'pre-line',
  overflow: $ellipsis ? 'hidden' : undefined,
  textOverflow: $ellipsis ? 'ellipsis' : undefined,
  fontWeight: $fontWeight ?? typography[$variant].fontWeight,
}));
