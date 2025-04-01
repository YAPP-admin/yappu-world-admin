import { FC } from 'react';
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import CalendarIcon from '@assets/CalendarIcon';
import theme from 'styles/theme';

import FlexBox from './FlexBox';
import Typography from './Typography';
import { ko } from '../../../node_modules/date-fns/locale/ko';

registerLocale('ko', ko);

interface Props {
  label?: string;
  name: string;
}

const Calendar: FC<Props> = (props) => {
  const { name, label } = props;
  const { control } = useFormContext();
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FlexBox direction="column" gap={4}>
            {label && (
              <Typography color="label-normal" variant="label1Normal">
                {label}
              </Typography>
            )}
            <CalendarLabel>
              <DatePicker
                dateFormat={'yyyy.MM.dd'}
                icon={<CalendarIcon />}
                locale={ko}
                placeholderText={'YYYY.MM.DD'}
                popperContainer={CalendarContainer}
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
              />
              <CalendarIcon />
            </CalendarLabel>
          </FlexBox>
        )}
      />
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  flex: 1;
`;

const CalendarLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.lineNormal.strong};
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 10px;

  .react-datepicker-wrapper {
    width: 100%;

    .react-datepicker__input-container {
      width: 100%;
    }

    input {
      border: none;
    }

    input:focus {
      outline: none;
    }
  }
`;
