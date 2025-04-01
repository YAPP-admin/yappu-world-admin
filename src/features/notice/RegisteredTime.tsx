import dayjs from 'dayjs';
import { FC } from 'react';

import CalendarIcon from '@assets/CalendarIcon';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';

interface Props {
  date: string;
}

const RegisteredTime: FC<Props> = ({ date }) => {
  return (
    <FlexBox align="center" gap={8} width="fit-content">
      <CalendarIcon color={theme.colors.label.assistive} size="16" />
      <Typography color="label-assistive" variant="label1Regular">
        {dayjs(new Date(date)).format('YYYY.MM.DD hh:mm')}
      </Typography>
    </FlexBox>
  );
};

export default RegisteredTime;
