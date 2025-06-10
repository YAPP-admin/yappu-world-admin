import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from 'react-hook-form';
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
import { useEditSessionMutation } from '@queries/session/useEditSessionMutaion';
import { useSessionEligibleUserQuery } from '@queries/session/useSessionEligibleUserQuery';
import { useSessionStore } from '@stores/sessionStore';
import { ErrorResponse } from 'apis/common/types';
import { SessionDetailRes } from 'apis/session/types';
import EditableTargetTable from 'features/session/EditableTargetTable';
import SessionTargetPopup from 'features/session/SessionTargetPopup';
import { convertSessionAttendee } from 'features/session/utils/convertSessionAttendee';
import { SessionFormSchema, SessionFormType } from 'schema/SessionFormScheme';
import { EditSessionType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

import { SelectedUsersMap } from './SessionWrite';

interface Props {
  handleEdit: () => void;
  data: SessionDetailRes | undefined;
}

const SessionEdit: FC<Props> = ({ handleEdit, data }) => {
  const { data: generationList } = useGenerationListQuery(1);
  const { data: eligibleUser } = useSessionEligibleUserQuery(
    String(data?.generation),
  );
  const method = useForm<SessionFormType>({
    resolver: zodResolver(SessionFormSchema),
    defaultValues: data
      ? {
          ...data,
          date: new Date(data.date),
          endDate: new Date(data.endDate),
          generation: data.generation.toString(),
          target:
            eligibleUser?.users.map((el) => el.users).flat().length ===
            data?.attendees.map((el) => el.attendees).flat().length
              ? 'ALL'
              : 'SELECT',
          sessionAttendeeIds: data?.attendees
            .map((el) => el.attendees)
            .flat()
            .map((el) => el.userId),
        }
      : undefined,
  });
  const { mutateAsync } = useEditSessionMutation();
  const setEditCompletePopup = useSessionStore(
    (state) => state.setEditCompletePopup,
  );
  const sessionTargetPopup = useSessionStore(
    (state) => state.sessionTargetPopup,
  );
  const setSessionTargetPopup = useSessionStore(
    (state) => state.setSessionTargetPopup,
  );
  const queryClient = useQueryClient();

  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersMap>(() =>
    convertSessionAttendee(data?.attendees),
  );

  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];

  const onSumbit = async (formData: SessionFormType) => {
    console.log('submit');
    if (!data) return;
    const hasSelectedUser = Object.values(selectedUsers).flat().length > 0;

    if (formData.target === 'SELECT' && !hasSelectedUser) {
      window.alert('세션 대상을 선택해 주세요.');
      return;
    }
    try {
      const allUserIds: string[] =
        eligibleUser?.users.flatMap((group) =>
          group.users.map((user) => user.userId),
        ) ?? [];
      if (formData.target === 'ALL') {
        formData.sessionAttendeeIds = allUserIds;
      } else {
        const selectedIds: string[] = Object.values(selectedUsers)
          .flat()
          .map((user) => user.userId);

        formData.sessionAttendeeIds = selectedIds;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { target, ...rest } = formData;

      const req: EditSessionType = {
        ...rest,
        id: data.id,
        generation: Number(formData.generation),
        date: dayjs(formData.date).format('YYYY-MM-DD'),
        endDate: dayjs(formData.endDate).format('YYYY-MM-DD'),
      };
      await mutateAsync(req);
      setEditCompletePopup(true);
      queryClient.invalidateQueries({ queryKey: ['session-detail', data.id] });
      handleEdit();
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        if (err.status !== 500) {
          showErrorToast(
            err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
          );
        }
      }
    }
  };

  const onInvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <Form
      onClick={(e) => e.stopPropagation()}
      onSubmit={method.handleSubmit(onSumbit, onInvalid)}
    >
      <Typography variant="title3Bold">세션 수정</Typography>
      <FormProvider {...method}>
        <FlexBox direction="column" gap={24}>
          <GridBox align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              세션 타입
            </Typography>
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
          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              제목
            </Typography>
            <FlexBox direction="column">
              <TextInput {...method.register('name')} />
              {method.formState.errors.name && (
                <Typography color="status-negative" variant="caption1Regular">
                  {method.formState.errors.name.message}
                </Typography>
              )}
            </FlexBox>
          </GridBox>
          <GridBox align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              시작일
            </Typography>
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
            <Typography fontWeight={600} variant="body1Normal">
              종료일
            </Typography>
            <FlexBox direction="column">
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
              {method.formState.errors.endTime?.message && (
                <Typography color="status-negative" variant="caption1Regular">
                  {method.formState.errors.endTime?.message}
                </Typography>
              )}
            </FlexBox>
          </GridBox>
          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              장소
            </Typography>
            <FlexBox direction="column">
              <TextInput {...method.register('place')} />
              {method.formState.errors.place && (
                <Typography color="status-negative" variant="caption1Regular">
                  {method.formState.errors.place.message}
                </Typography>
              )}
            </FlexBox>
          </GridBox>
          <div
            style={{
              height: '1px',
              background: 'rgba(112, 115, 124, 0.22)',
              width: '100%',
            }}
          />
          <GridBox align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              기수
            </Typography>
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

          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="body1Normal">
              세션 대상
            </Typography>
            <FlexBox align="center" gap={12}>
              <RadioGroup
                disabled={!method.watch('generation')}
                name="target"
                options={[
                  { label: '전체', value: 'ALL' },
                  { label: '선택', value: 'SELECT' },
                ]}
              />
              <SolidButton
                size="small"
                type="button"
                variant="secondary"
                onClick={() => setSessionTargetPopup(true)}
              >
                대상 선택
              </SolidButton>
            </FlexBox>
          </GridBox>
          <EditableTargetTable
            selectedUsers={selectedUsers}
            onRemove={(position, userId) => {
              setSelectedUsers((prev) => ({
                ...prev,
                [position]: prev[position].filter((u) => u.userId !== userId),
              }));
            }}
          />
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

      {sessionTargetPopup && (
        <SessionTargetPopup
          defaultSelectedUsers={selectedUsers}
          eligibleUsers={eligibleUser?.users ?? []}
          onClose={() => setSessionTargetPopup(false)}
          onConfirm={(updated) => {
            setSelectedUsers(updated);
            setSessionTargetPopup(false);
          }}
        />
      )}
    </Form>
  );
};

export default SessionEdit;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

  #radio-wrapper {
    display: flex;
    align-items: center;
    gap: 24px;
  }
`;
