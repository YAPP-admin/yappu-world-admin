import { FC } from 'react';
import styled from 'styled-components';

import {
  chipColorStyles,
  chipSizeStyles,
  roleChipStyleMap,
} from '@constants/chipStyles';
import { RoleName } from 'apis/user/types';

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
  text?: string;
  role?: RoleName;
}

const Chip: FC<ChipProps> = (props) => {
  const {
    text = '',
    color = 'primary',
    size = 'small',
    variant = 'fill',
    role = '',
  } = props;

  const roleStyle = role ? roleChipStyleMap[role] : undefined;

  const resolvedColor = roleStyle?.color ?? color ?? 'primary';
  const resolvedVariant = roleStyle?.variant ?? variant ?? 'fill';

  return (
    <CustomChip color={resolvedColor} size={size} variant={resolvedVariant}>
      {text}
    </CustomChip>
  );
};

export default Chip;

const CustomChip = styled.span<Pick<ChipProps, 'color' | 'size' | 'variant'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  ${({ size }) => chipSizeStyles[size || 'small']}
  ${({ color, variant }) =>
    chipColorStyles[color || 'primary'][variant || 'fill']}
`;
