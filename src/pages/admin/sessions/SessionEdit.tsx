import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Calendar from '@compnents/commons/Calendar';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import RadioGroup from '@compnents/commons/RadioGroup';
import Select, { OptionType } from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import {
  hourOptions,
  minuteOptions,
  sessionTypeList,
} from '@constants/optionList';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { EditSessionType } from 'types/formTypes';

interface Props {
  handleEdit: () => void;
}

const SessionEdit: FC<Props> = ({ handleEdit }) => {
  const method = useForm<EditSessionType>();
  const { data: generationList } = useGenerationListQuery(1);

  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];

  return (
    <FlexBox direction="column" gap={40}>
      <Typography variant="title3Bold">세션 수정</Typography>
      <FormProvider {...method}>
        <FlexBox direction="column" gap={24}>
          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography variant="body1Normal">제목</Typography>
            <TextInput />
          </GridBox>
          <GridBox columns="79px 1fr" gap={16}>
            <Typography variant="body1Normal">시작 날짜</Typography>
            <FlexBox gap={20}>
              <Calendar name="date" />

              <Controller
                control={method.control}
                name="time"
                render={({ field }) => {
                  const [hour, minute] = field.value?.split(':') ?? [
                    '00',
                    '00',
                  ];

                  return (
                    <FlexBox gap={8}>
                      <Select
                        optionList={hourOptions}
                        selectedValue={hour}
                        onChange={(selectedHour) => {
                          const newTime = `${selectedHour}:${minute}:00`;
                          field.onChange(newTime);
                        }}
                      />
                      <Select
                        optionList={minuteOptions}
                        selectedValue={minute}
                        onChange={(selectedMinute) => {
                          const newTime = `${hour}:${selectedMinute}:00`;
                          field.onChange(newTime);
                        }}
                      />
                    </FlexBox>
                  );
                }}
              />
            </FlexBox>
          </GridBox>
          <GridBox columns="79px 1fr" gap={16}>
            <Typography variant="body1Normal">종료 날짜</Typography>
            <FlexBox gap={20}>
              <Calendar name="endDate" />
              <Controller
                control={method.control}
                name="endTime"
                render={({ field }) => {
                  const [hour, minute] = field.value?.split(':') ?? [
                    '00',
                    '00',
                  ];

                  return (
                    <FlexBox gap={8}>
                      <Select
                        optionList={hourOptions}
                        selectedValue={hour}
                        onChange={(selectedHour) => {
                          const newTime = `${selectedHour}:${minute}:00`;
                          field.onChange(newTime);
                        }}
                      />
                      <Select
                        optionList={minuteOptions}
                        selectedValue={minute}
                        onChange={(selectedMinute) => {
                          const newTime = `${hour}:${selectedMinute}:00`;
                          field.onChange(newTime);
                        }}
                      />
                    </FlexBox>
                  );
                }}
              />
            </FlexBox>
          </GridBox>
          <FlexBox gap={90}>
            <GridBox columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">기수</Typography>
              <Controller
                control={method.control}
                name="generation"
                render={({ field }) => (
                  <Select
                    optionList={optionList}
                    size="large"
                    width="191px"
                    selectedValue={
                      optionList.find(
                        (item) => item.value === field.value?.toString(),
                      )?.value ?? ''
                    }
                    onChange={field.onChange}
                  />
                )}
              />
            </GridBox>
            <GridBox columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">세션 타입</Typography>
              <Controller
                control={method.control}
                name="sessionType"
                render={({ field }) => (
                  <Select
                    optionList={sessionTypeList}
                    size="large"
                    width="191px"
                    selectedValue={
                      sessionTypeList.find((item) => item.value === field.value)
                        ?.value ?? ''
                    }
                    onChange={field.onChange}
                  />
                )}
              />
            </GridBox>
          </FlexBox>
          <GridBox fullWidth columns="79px 1fr" gap={16}>
            <Typography variant="body1Normal">장소</Typography>
            <PlaceWrapper>
              <RadioGroup name="place" options={['오프라인', '온라인']} />
              <TextInput />
            </PlaceWrapper>
          </GridBox>
        </FlexBox>

        <FlexBox gap={8} justify="flex-end">
          <OutlinedButton size="large" variant="assistive" onClick={handleEdit}>
            취소
          </OutlinedButton>
          <SolidButton size="large" type="submit">
            저장
          </SolidButton>
        </FlexBox>
      </FormProvider>
    </FlexBox>
  );
};

export default SessionEdit;

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  #radio-wrapper {
    display: flex;
    align-items: center;
    gap: 24px;
  }
`;
