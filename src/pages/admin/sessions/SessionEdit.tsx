import { isAxiosError } from 'axios';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Calendar from '@compnents/commons/Calendar';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Select, { OptionType } from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import {
  hourOptions,
  minuteOptions,
  sessionTypeList,
} from '@constants/optionList';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useEditSessionMutation } from '@queries/session/useEditSessionMutaion';
import { useSessionStore } from '@stores/sessionStore';
import { ErrorResponse } from 'apis/common/types';
import { SessionDetailRes } from 'apis/session/types';
import { EditSessionType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

interface Props {
  handleEdit: () => void;
  data: SessionDetailRes | undefined;
}

const SessionEdit: FC<Props> = ({ handleEdit, data }) => {
  const method = useForm<EditSessionType>({ defaultValues: data });
  const { data: generationList } = useGenerationListQuery(1);
  const { mutateAsync } = useEditSessionMutation();
  const navigate = useNavigate();
  const setEditCompletePopup = useSessionStore(
    (state) => state.setEditCompletePopup,
  );

  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];

  const onSumbit = async (data: EditSessionType) => {
    try {
      await mutateAsync(data);
      setEditCompletePopup(true);
      navigate('/admin/sessions');
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
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
            <TextInput {...method.register('place')} />
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
    </Form>
  );
};

export default SessionEdit;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
