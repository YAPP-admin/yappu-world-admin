import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { useSessionMutation } from '@queries/session/useSessionMutation';
import { useSessionStore } from '@stores/sessionStore';
import { SesseionReq } from 'apis/session/types';
import { AddSessionType } from 'types/formTypes';

const SessionWrite: FC = () => {
  const { data: generationList } = useGenerationListQuery(1);
  const method = useForm<AddSessionType>();
  const { mutateAsync } = useSessionMutation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAddCompletePopup = useSessionStore(
    (state) => state.setAddCompletePopup,
  );
  const page = useSessionStore((state) => state.page);

  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];

  const onSumbit = async (data: AddSessionType) => {
    try {
      const req: SesseionReq = {
        ...data,
        generation: Number(data.generation),
        date: dayjs(data.date).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        type: 'SESSION',
      };
      await mutateAsync(req);
      setAddCompletePopup(true);
      queryClient.invalidateQueries({ queryKey: ['session-list', page] });
      navigate('/admin/sessions');
    } catch (err) {
      console.log('err :', err);
    }
  };

  return (
    <Form
      onClick={(e) => e.stopPropagation()}
      onSubmit={method.handleSubmit(onSumbit)}
    >
      <Typography variant="title3Bold">세션 수정</Typography>
      <FormProvider {...method}>
        <FlexBox direction="column" gap={24}>
          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography variant="body1Normal">제목</Typography>
            <TextInput {...method.register('name')} />
          </GridBox>
          <GridBox align="center" columns="79px 1fr" gap={16}>
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
          <GridBox align="center" columns="79px 1fr" gap={16}>
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
            <GridBox align="center" columns="79px 1fr" gap={16}>
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
            <GridBox align="center" columns="79px 1fr" gap={16}>
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
              <RadioGroup
                name="sessionType"
                options={[
                  { label: '오프라인', value: 'OFFLINE' },
                  { label: '온라인', value: 'ONLINE' },
                ]}
              />
              <TextInput {...method.register('place')} />
            </PlaceWrapper>
          </GridBox>
        </FlexBox>

        <FlexBox gap={8} justify="flex-end">
          <OutlinedButton
            size="large"
            variant="assistive"
            onClick={() => navigate('/admin/sessions')}
          >
            취소
          </OutlinedButton>
          <SolidButton size="large" type="submit">
            저장
          </SolidButton>
        </FlexBox>
      </FormProvider>
    </Form>
  );
};
export default SessionWrite;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px 40px;
`;

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
