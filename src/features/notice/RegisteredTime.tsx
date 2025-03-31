import CalendarIcon from '@assets/CalendarIcon';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import dayjs from 'dayjs';
import { FC } from 'react';
import theme from 'styles/theme';

interface Props {
  date: string;
}

const RegisteredTime: FC<Props> = ({ date }) => {
  return (
    <FlexBox gap={8} align="center" width="fit-content">
      <CalendarIcon size="16" color={theme.colors.label.assistive} />
      <Typography variant="label1Regular" color="label-assistive">
        {dayjs(new Date(date)).format('YYYY.MM.DD hh:mm')}
      </Typography>
    </FlexBox>
  );
};

export default RegisteredTime;
