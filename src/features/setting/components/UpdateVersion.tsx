import OutlinedButton from '@compnents/Button/OutlinedButton';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Typography from '@compnents/commons/Typography';
import dayjs from 'dayjs';
import { FC } from 'react';

interface Props {
  date: string;
  version: string;
  onClick: () => void;
}

const UpdateVersion: FC<Props> = ({ date, version, onClick }) => {
  return (
    <GridBox columns="80px 80px 1fr" gap={16} align="center">
      <Typography variant="label1Normal" color="label-alternative">
        {dayjs(date).format('YYYY.MM.DD')}
      </Typography>
      <Typography variant="heading2Bold" color="label-neutral">
        {version}
      </Typography>
      <OutlinedButton variant="assistive" size="xsmall" onClick={onClick}>
        강제 업데이트
      </OutlinedButton>
    </GridBox>
  );
};

export default UpdateVersion;
