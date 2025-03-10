import { typography, TypographyType } from '@constants/typographyStyles';
import { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  variatnt: TypographyType;
  text: string;
  style?: React.CSSProperties;
}

const Typography: FC<Props> = (props) => {
  const { variatnt, text, style } = props;
  return (
    <CustomTypo variant={variatnt} style={style}>
      {text}
    </CustomTypo>
  );
};

export default Typography;

const CustomTypo = styled.span<{ variant: TypographyType }>`
  ${({ variant }) => css`
    font-size: ${typography[variant].fontSize};
    line-height: ${typography[variant].lineHeight};
    letter-spacing: ${typography[variant].letterSpacing};
  `}
`;
