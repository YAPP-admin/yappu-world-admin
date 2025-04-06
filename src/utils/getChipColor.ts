import { ChipColor, ChipStyle } from '@compnents/commons/Chip';

export const getChipColor = (
  type: string,
): { color: ChipColor; variant: ChipStyle } => {
  switch (type) {
    case '대기':
      return { color: 'neutral', variant: 'weak' };
    case '거절':
      return { color: 'secondary', variant: 'fill' };
    case '승인':
      return { color: 'primary', variant: 'fill' };
    default:
      return { color: 'neutral', variant: 'weak' };
  }
};
