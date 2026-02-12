import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { FC, useMemo, useState, useEffect } from 'react';
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import CircleClose from '@assets/CircleClose';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import Calendar from '@compnents/commons/Calendar';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import RadioGroup from '@compnents/commons/RadioGroup';
import Select from '@compnents/commons/Select';
import TextInput, { State } from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import PostcodePopup from '@compnents/popup/PostcodePopup';
import {
  hourOptions,
  minuteOptions,
  OptionType,
  sessionTypeList,
} from '@constants/optionList';
import { useDaumPostcode } from '@hooks/useDaumPostcode';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useSessionEligibleUserQuery } from '@queries/session/useSessionEligibleUserQuery';
import { useSessionMutation } from '@queries/session/useSessionMutation';
import { useSessionStore } from '@stores/sessionStore';
import { ErrorResponse } from 'apis/common/types';
import { UserInfo } from 'apis/notice/types';
import { SesseionReq, UserPosition } from 'apis/session/types';
import EditableTargetTable from 'features/session/EditableTargetTable';
import RelatedNoticePopup from 'features/session/RelatedNoticePopup';
import SessionTargetPopup from 'features/session/SessionTargetPopup';
import { SessionFormSchema, SessionFormType } from 'schema/SessionFormScheme';
import { showErrorToast } from 'types/showErrorToast';

export type SelectedUsersMap = Record<UserPosition, UserInfo[]>;

export const emptySelectedUsers: SelectedUsersMap = {
  PM: [],
  DESIGN: [],
  WEB: [],
  ANDROID: [],
  IOS: [],
  FLUTTER: [],
  SERVER: [],
  STAFF: [],
};

const SessionWrite: FC = () => {
  const { data: generationList } = useGenerationListQuery(1, 100);
  const method = useForm<SessionFormType>({
    resolver: zodResolver(SessionFormSchema),
    defaultValues: {
      target: 'ALL',
      sessionAttendeeIds: [],
      sessionType: 'OFFLINE',
      latitude: 0,
      longitude: 0,
    },
  });
  const { data: eligibleUser } = useSessionEligibleUserQuery(
    method.watch('generation'),
  );
  const { mutateAsync } = useSessionMutation();
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
  const relatedNoticePopup = useSessionStore(
    (state) => state.relatedNoticePopup,
  );
  const setReleatedNoticePopup = useSessionStore(
    (state) => state.setReleatedNoticePopup,
  );

  const { isOpen, openPostcode, closePostcode, handleComplete } =
    useDaumPostcode({
      onComplete: (data) => {
        method.setValue('address', data.address);
        method.setValue('latitude', data.latitude);
        method.setValue('longitude', data.longitude);
      },
    });

  const sessionType = method.watch('sessionType');
  const isOffline = sessionType === 'OFFLINE';
  const values = method.watch(['name', 'place', 'address']);
  const { errors } = method.formState;

  const states = useMemo(() => {
    const getState = (value: string | null, error?: FieldError): State => {
      if (!value) return 'default';
      if (error) return 'error';
      return 'success';
    };

    return {
      name: getState(values[0], errors.name),
      place: getState(values[1], errors.place),
      address: getState(values[2], errors.address),
    };
  }, [values, errors]);

  useEffect(() => {
    const subscription = method.watch((value, { name }) => {
      if (name === 'sessionType' && value.sessionType !== 'OFFLINE') {
        method.setValue('address', '');
        method.setValue('latitude', 0);
        method.setValue('longitude', 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [method]);

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
      const { target, notices, ...rest } = data;

      const req: SesseionReq = {
        ...rest,
        generation: Number(data.generation),
        date: dayjs(data.date).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        type: 'SESSION',
        noticeIds: data.notices.map((el) => el.noticeId),
        longitude: data.longitude,
        latitude: data.latitude,
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

  const formNotices = method.watch('notices') ?? [];

  const removeNotice = (noticeId: string) => {
    const next = formNotices.filter((n) => n.noticeId !== noticeId);
    method.setValue('notices', next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <FormProvider {...method}>
      <Container>
        <IconButton variant="outlined" onClick={onClickBack}>
          <ArrowLeft size="20" />
        </IconButton>
        <Form
          onClick={(e) => e.stopPropagation()}
          onSubmit={method.handleSubmit(onSumbit)}
        >
          <Typography variant="title3Bold">신규 세션 추가</Typography>

          <FlexBox direction="column" gap={24}>
            <GridBox align="center" columns="79px 1fr" gap={16}>
              <Typography fontWeight={600} variant="headline1Bold">
                세션 타입
              </Typography>
              <FlexBox direction="column">
                <RadioGroup name="sessionType" options={sessionTypeList} />
                {method.formState.errors.sessionType && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.sessionType.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>
            <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
              <Typography fontWeight={600} variant="headline1Bold">
                제목
              </Typography>
              <FlexBox direction="column">
                <TextInput
                  placeholder="제목을 입력하세요"
                  {...method.register('name')}
                  state={states.name}
                />
                {method.formState.errors.name && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {method.formState.errors.name.message}
                  </Typography>
                )}
              </FlexBox>
            </GridBox>
            <GridBox align="center" columns="79px 1fr" gap={16}>
              <Typography fontWeight={600} variant="headline1Bold">
                시작일
              </Typography>
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
                            defaultSelectLabel="00시"
                            optionList={hourOptions}
                            selectedValue={hour ?? '-'}
                            size="large"
                            width="130px"
                            onChange={(selectedHour) => {
                              const newTime = `${selectedHour}:${minute}:00`;
                              field.onChange(newTime);
                            }}
                          />
                          <Select
                            defaultSelectLabel="00분"
                            optionList={minuteOptions}
                            selectedValue={minute}
                            size="large"
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
              <Typography fontWeight={600} variant="headline1Bold">
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
                        '',
                        '',
                      ];

                      return (
                        <FlexBox gap={8}>
                          <Select
                            defaultSelectLabel="00시"
                            optionList={hourOptions}
                            selectedValue={hour}
                            size="large"
                            width="130px"
                            onChange={(selectedHour) => {
                              const newTime = `${selectedHour}:${minute}:00`;
                              field.onChange(newTime);
                            }}
                          />
                          <Select
                            defaultSelectLabel="00분"
                            optionList={minuteOptions}
                            selectedValue={minute}
                            size="large"
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

            {isOffline && (
              <>
                <GridBox
                  fullWidth
                  align="center"
                  columnGap={16}
                  columns="79px 1fr"
                  rowGap={8}
                >
                  <Typography fontWeight={600} variant="headline1Bold">
                    장소
                  </Typography>
                  <FlexBox direction="column" gap={8}>
                    <FlexBox gap={8}>
                      <TextInput
                        {...method.register('address')}
                        disabled
                        readOnly
                        state={states.address}
                        style={{ flex: 1 }}
                        width="469px"
                      />
                      <SolidButton
                        size="large"
                        type="button"
                        variant="primary"
                        onClick={openPostcode}
                      >
                        주소 검색
                      </SolidButton>
                    </FlexBox>
                  </FlexBox>
                  <div />
                  <FlexBox direction="column" gap={8}>
                    <TextInput
                      {...method.register('place')}
                      placeholder="장소명을 입력해주세요"
                      state={states.place}
                    />
                    {method.formState.errors.place && (
                      <Typography
                        color="status-negative"
                        variant="caption1Regular"
                      >
                        {method.formState.errors.place.message}
                      </Typography>
                    )}
                  </FlexBox>
                </GridBox>
              </>
            )}
            {!isOffline && (
              <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
                <Typography fontWeight={600} variant="headline1Bold">
                  장소
                </Typography>
                <FlexBox direction="column">
                  <TextInput
                    {...method.register('place')}
                    state={states.place}
                    placeholder={
                      sessionType === 'ONLINE'
                        ? '온라인 만남 URL을 입력해주세요'
                        : ''
                    }
                  />
                  {method.formState.errors.place && (
                    <Typography
                      color="status-negative"
                      variant="caption1Regular"
                    >
                      {method.formState.errors.place.message}
                    </Typography>
                  )}
                </FlexBox>
              </GridBox>
            )}

            <div
              style={{
                height: '1px',
                background: 'rgba(112, 115, 124, 0.22)',
                width: '100%',
              }}
            />

            <GridBox align="center" columns="79px 1fr" gap={16}>
              <Typography fontWeight={600} variant="headline1Bold">
                기수
              </Typography>
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
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedUsers(emptySelectedUsers);
                        queryClient.invalidateQueries({
                          queryKey: [
                            'eligible-user',
                            method.watch('generation'),
                          ],
                        });
                      }}
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
              <Typography fontWeight={600} variant="headline1Bold">
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

          <div
            style={{
              height: '1px',
              background: 'rgba(112, 115, 124, 0.22)',
              width: '100%',
            }}
          />

          <GridBox fullWidth align="center" columns="79px 1fr" gap={16}>
            <Typography fontWeight={600} variant="headline1Bold">
              공지사항
            </Typography>
            <FlexBox direction="column" gap={12}>
              <OutlinedButton
                size="medium"
                style={{ width: 'fit-content' }}
                type="button"
                variant="primary"
                onClick={() => setReleatedNoticePopup(true)}
              >
                추가
              </OutlinedButton>
              {!!formNotices.length &&
                formNotices.map((el) => (
                  <FlexBox key={el.noticeId} gap={16}>
                    <Typography color="primary-normal" variant="headline1Bold">
                      {el.title}
                    </Typography>
                    <IconButton onClick={() => removeNotice(el.noticeId)}>
                      <CircleClose color="rgba(55, 56, 60, 0.28)" />
                    </IconButton>
                  </FlexBox>
                ))}
            </FlexBox>
          </GridBox>

          <FlexBox gap={8} justify="flex-end">
            <OutlinedButton
              size="large"
              variant="assistive"
              onClick={onClickBack}
            >
              취소
            </OutlinedButton>
            <SolidButton
              disabled={!method.formState.isValid}
              size="large"
              type="submit"
            >
              저장
            </SolidButton>
          </FlexBox>
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
        {relatedNoticePopup && (
          <RelatedNoticePopup onClose={() => setReleatedNoticePopup(false)} />
        )}
        <PostcodePopup
          isOpen={isOpen}
          onClose={closePostcode}
          onComplete={handleComplete}
        />
      </Container>
    </FormProvider>
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
