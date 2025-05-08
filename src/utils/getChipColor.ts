import { ChipColor, ChipStyle } from '@compnents/commons/Chip';

export const getChipColor = (
  type: string,
): { color: ChipColor; variant: ChipStyle } => {
  switch (type) {
    case '대기':
    case '공결':
      return { color: 'neutral', variant: 'weak' };
    case '거절':
      return { color: 'secondary', variant: 'fill' };
    case '승인':
      return { color: 'primary', variant: 'fill' };
    case '결석':
      return { color: 'primary', variant: 'weak' };
    case '출석':
      return { color: 'lightBlue', variant: 'weak' };
    case '지각':
      return { color: 'coolNeutral', variant: 'weak' };
    case '조퇴':
      return { color: 'violet', variant: 'weak' };
    default:
      return { color: 'neutral', variant: 'weak' };
  }
};
