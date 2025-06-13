import { FC } from 'react';

import { AttendanceStatusValueType } from 'apis/attendance/types';
import _Chip, { ChipColor, ChipStyle } from 'components/commons/Chip';

interface Props {
  type: AttendanceStatusValueType | string;
  label: string;
}

const Chip: FC<Props> = ({ label, type }) => {
  const { color, variant } = CHIP_STYLE_MAP[type];
  return <_Chip color={color} size="large" text={label} variant={variant} />;
};

export default Chip;

const CHIP_STYLE_MAP: Record<
  AttendanceStatusValueType | string,
  {
    color: ChipColor;
    variant: ChipStyle;
  }
> = {
  PENDING: { color: 'neutral', variant: 'weak' },
  ON_TIME: { color: 'lightBlue', variant: 'weak' },
  LATE: { color: 'coolNeutral', variant: 'weak' },
  ABSENT: {
    color: 'primary',
    variant: 'weak',
  },
  EARLY_CHECK_OUT: { color: 'violet', variant: 'weak' },
  EXCUSED_ABSENCE: { color: 'neutral', variant: 'weak' },
};
