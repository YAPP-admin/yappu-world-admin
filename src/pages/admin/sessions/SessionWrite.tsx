import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
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
import { useSessionEligibleUserQuery } from '@queries/session/useSessionEligibleUserQuery';
import { useSessionMutation } from '@queries/session/useSessionMutation';
import { useSessionStore } from '@stores/sessionStore';
import { ErrorResponse } from 'apis/common/types';
import { UserInfo } from 'apis/notice/types';
import { SesseionReq, UserPosition } from 'apis/session/types';
import EditableTargetTable from 'features/session/EditableTargetTable';
import SessionTargetPopup from 'features/session/SessionTargetPopup';
import { SessionFormSchema, SessionFormType } from 'schema/SessionFormScheme';
import { showErrorToast } from 'types/showErrorToast';

export type SelectedUsersMap = Record<UserPosition, UserInfo[]>;

const SessionWrite: FC = () => {
  const { data: generationList } = useGenerationListQuery(1);
  const method = useForm<SessionFormType>({
    resolver: zodResolver(SessionFormSchema),
    defaultValues: {
      target: 'ALL',
      sessionAttendeeIds: [],
    },
  });
  const { data: eligibleUser } = useSessionEligibleUserQuery(
    method.watch('generation'),
  );
  const { mutateAsync } = useSessionMutation();
  const emptySelectedUsers: SelectedUsersMap = {
    PM: [],
    DESIGN: [],
    WEB: [],
    ANDROID: [],
    IOS: [],
    FLUTTER: [],
    SERVER: [],
  };
  const [selectedUsers, setSelectedUsers] =
    useState<SelectedUsersMap>(emptySelectedUsers);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAddCompletePopup = useSessionStore(
    (state) => state.setAddCompletePopup,
  );
  const page = useSessionStore((state) => state.page);
  const sessionTargetPopup = useSessionStore(
    (state) => state.sessionTargetPopup,
  );
  const setSessionTargetPopup = useSessionStore(
    (state) => state.setSessionTargetPopup,
  );

  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];

  const onSumbit = async (data: SessionFormType) => {
    const hasSelectedUser = Object.values(selectedUsers).flat().length > 0;

    if (data.target === 'SELECT' && !hasSelectedUser) {
      window.alert('세션 대상을 선택해 주세요.');
      return;
    }
    try {
      const allUserIds: string[] =
        eligibleUser?.users.flatMap((group) =>
          group.users.map((user) => user.userId),
        ) ?? [];
      if (data.target === 'ALL') {
        data.sessionAttendeeIds = allUserIds;
      } else {
        const selectedIds: string[] = Object.values(selectedUsers)
          .flat()
          .map((user) => user.userId);

        data.sessionAttendeeIds = selectedIds;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { target, ...rest } = data;

      const req: SesseionReq = {
        ...rest,
        generation: Number(data.generation),
        date: dayjs(data.date).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        type: 'SESSION',
      };
      const res = await mutateAsync(req);
      const location = res.headers['location'];
      const id = location?.split('/').pop();
      setAddCompletePopup(true);
      queryClient.invalidateQueries({ queryKey: ['session-list', page] });
      navigate(`/admin/sessions/detail/${id}`);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  const onClickBack = () => {
    navigate('/admin/sessions');
  };

  return (
    <Container>
      <IconButton variant="outlined" onClick={onClickBack}>
        <ArrowLeft size="20" />
      </IconButton>
      <Form
        onClick={(e) => e.stopPropagation()}
        onSubmit={method.handleSubmit(onSumbit)}
      >
        <Typography variant="title3Bold">신규 세션 추가</Typography>
        <FormProvider {...method}>
          <FlexBox direction="column" gap={24}>
            <GridBox align="center" columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">세션 타입</Typography>
              <FlexBox direction="column">
                <Controller
                  control={method.control}
                  name="sessionType"
                  render={({ field }) => (
                    <Select
                      optionList={sessionTypeList}
                      size="large"
                      width="191px"
                      selectedValue={
                        sessionTypeList.find(
                          (item) => item.value === field.value,
                        )?.value ?? ''
                      }
                      onChange={field.onChange}
                    />
                  )}
                />
                {method.formState.errors.sessionType && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.sessionType.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>
            <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">제목</Typography>
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
              <Typography variant="body1Normal">시작일</Typography>
              <FlexBox direction="column">
                <FlexBox gap={20}>
                  <Calendar name="date" />
                  <Controller
                    control={method.control}
                    name="time"
                    render={({ field }) => {
                      const [hour, minute] = field.value?.split(':') ?? [
                        '',
                        '',
                      ];

                      return (
                        <FlexBox gap={8}>
                          <Select
                            optionList={hourOptions}
                            selectedValue={hour ?? '-'}
                            width="130px"
                            onChange={(selectedHour) => {
                              const newTime = `${selectedHour}:${minute}:00`;
                              field.onChange(newTime);
                            }}
                          />
                          <Select
                            optionList={minuteOptions}
                            selectedValue={minute}
                            width="130px"
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
                {(method.formState.errors.date?.message ||
                  method.formState.errors.time?.message) && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.date?.message ??
                      method.formState.errors.time?.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>
            <GridBox align="center" columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">종료일</Typography>
              <FlexBox direction="column">
                <FlexBox gap={20}>
                  <Calendar name="endDate" />
                  <Controller
                    control={method.control}
                    name="endTime"
                    render={({ field }) => {
                      const [hour, minute] = field.value?.split(':') ?? [
                        '',
                        '',
                      ];

                      return (
                        <FlexBox gap={8}>
                          <Select
                            optionList={hourOptions}
                            selectedValue={hour}
                            width="130px"
                            onChange={(selectedHour) => {
                              const newTime = `${selectedHour}:${minute}:00`;
                              field.onChange(newTime);
                            }}
                          />
                          <Select
                            optionList={minuteOptions}
                            selectedValue={minute}
                            width="130px"
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
                {(method.formState.errors.endDate?.message ||
                  method.formState.errors.endTime?.message) && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.endDate?.message ??
                      method.formState.errors.endTime?.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>

            <GridBox fullWidth columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">장소</Typography>
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
              <Typography variant="body1Normal">기수</Typography>
              <FlexBox direction="column">
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
                {method.formState.errors.generation && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.generation.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>
            <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
              <Typography variant="body1Normal">세션 대상</Typography>
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
                  disabled={method.watch('target') !== 'SELECT'}
                  size="small"
                  type="button"
                  variant="secondary"
                  onClick={() => setSessionTargetPopup(true)}
                >
                  대상 선택
                </SolidButton>
              </FlexBox>
            </GridBox>
            {method.watch('target') === 'SELECT' && (
              <EditableTargetTable
                selectedUsers={selectedUsers}
                onRemove={(position, userId) => {
                  setSelectedUsers((prev) => ({
                    ...prev,
                    [position]: prev[position].filter(
                      (u) => u.userId !== userId,
                    ),
                  }));
                }}
              />
            )}
          </FlexBox>

          <FlexBox gap={8} justify="flex-end">
            <OutlinedButton
              size="large"
              variant="assistive"
              onClick={onClickBack}
            >
              취소
            </OutlinedButton>
            <SolidButton size="large" type="submit">
              저장
            </SolidButton>
          </FlexBox>
        </FormProvider>
      </Form>
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
    </Container>
  );
};
export default SessionWrite;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 40px;
  overflow-y: auto;
`;

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
