import { typography, TypographyType } from '@constants/typographyStyles';
import { FC, JSX, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyType;
  children: ReactNode;
  style?: React.CSSProperties;
}

const Typography: FC<Props> = ({ as = 'span', variant, children, style }) => {
  return (
    <CustomTypo as={as} $variant={variant} style={style}>
      {children}
    </CustomTypo>
  );
};

export default Typography;

const CustomTypo = styled.span<{ $variant: TypographyType }>`
  ${({ $variant }) => css`
    font-size: ${typography[$variant].fontSize};
    line-height: ${typography[$variant].lineHeight};
    letter-spacing: ${typography[$variant].letterSpacing};
    font-weight: ${typography[$variant].fontWeight};
  `}
`;
