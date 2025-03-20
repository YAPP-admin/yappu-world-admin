import { chipColorStyles, chipSizeStyles } from '@constants/chipStyles';
import { FC } from 'react';
import styled from 'styled-components';

export type ChipColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'coolNeutral'
  | 'lime'
  | 'violet'
  | 'lightBlue'
  | 'pink';

export type ChipStyle = 'weak' | 'fill';
export type ChipSize = 'small' | 'large';

interface ChipProps {
  color?: ChipColor;
  variant?: ChipStyle;
  size?: ChipSize;
  text: string;
}

const Chip: FC<ChipProps> = (props) => {
  const { text, color = 'primary', size = 'small', variant = 'fill' } = props;
  return (
    <CustomChip color={color} size={size} variant={variant}>
      {text}
    </CustomChip>
  );
};

export default Chip;

const CustomChip = styled.span<Pick<ChipProps, 'color' | 'size' | 'variant'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ size }) => chipSizeStyles[size || 'small']}
  ${({ color, variant }) =>
    chipColorStyles[color || 'primary'][variant || 'fill']}
`;
