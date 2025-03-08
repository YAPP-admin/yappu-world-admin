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
  chipColor?: ChipColor;
  chipStyle?: ChipStyle;
  chipSize?: ChipSize;
  text: string;
}

const Chip: FC<ChipProps> = (props) => {
  const {
    text,
    chipColor = 'primary',
    chipSize = 'small',
    chipStyle = 'fill',
  } = props;
  return (
    <CustomChip chipColor={chipColor} chipSize={chipSize} chipStyle={chipStyle}>
      {text}
    </CustomChip>
  );
};

export default Chip;

const CustomChip = styled.span<
  Pick<ChipProps, 'chipColor' | 'chipSize' | 'chipStyle'>
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ chipSize }) => chipSizeStyles[chipSize || 'small']}
  ${({ chipColor, chipStyle }) =>
    chipColorStyles[chipColor || 'primary'][chipStyle || 'fill']}
`;
