import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { Control, FormProvider, useForm, useWatch } from 'react-hook-form';
import removeMarkdown from 'remove-markdown';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import RadioGroup from '@compnents/commons/RadioGroup';
import TextInput from '@compnents/commons/TextInput';
import TextInputBox from '@compnents/commons/TextInputBox';
import Typography from '@compnents/commons/Typography';
import { useEditNoticeMutation } from '@queries/notice/useEditNoticeMutation';
import { useNoticeStore } from '@stores/noticeStore';
import { ErrorResponse } from 'apis/common/types';
import { EditNoticeReq, NoticeDetailRes } from 'apis/notice/types';
import { SessionRes, SessionType } from 'apis/session/types';
import SelectSessionPopup from 'features/notice/components/SelectSessionPopup';
import { EditNoticeType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

interface Props {
  handleEdit: () => void;
  data: NoticeDetailRes | undefined;
}

const NoticeEdit: FC<Props> = ({ handleEdit, data }) => {
  const methods = useForm<EditNoticeType>({
    defaultValues: {
      id: data?.noticeId,
      type: data?.type,
      title: data?.title,
      content: data?.content,
      plainContent: '',
      sessionId: data?.targetSession.sessionId,
    },
  });
  const { mutateAsync } = useEditNoticeMutation();
  const setIsEditPopup = useNoticeStore((state) => state.setIsEditPopup);
  const queryClient = useQueryClient();
  const selectSessionPopupOpen = useNoticeStore(
    (state) => state.selectSessionPopupOpen,
  );
  const setSelectSessionPopupOpen = useNoticeStore(
    (state) => state.setSelectSessionPopupOpen,
  );
  const selectedSession = useNoticeStore((state) => state.selectedSession);
  const setSelectedSession = useNoticeStore(
    (state) => state.setSelectedSession,
  );
  useEffect(() => {
    if (!data) return;
    const targetSession: SessionRes = {
      id: data.targetSession.sessionId,
      generation: data.targetSession.generation,
      type: data.type as SessionType,
      title: data.targetSession.title,
      place: '',
      date: data.targetSession.date,
      time: data.targetSession.time,
      endTime: '',
    };
    setSelectedSession(targetSession);
  }, []);

  const onSumbit = async (data: EditNoticeType) => {
    console.log(data);
    const plainText = removeMarkdown(data.content).replaceAll(
      // eslint-disable-next-line no-control-regex
      /[\x00-\x1F\x7F]/g,
      '',
    );
    const newData = { ...data, plainContent: plainText };

    try {
      const req: EditNoticeReq = newData;
      await mutateAsync(req);
      setIsEditPopup(true);
      queryClient.invalidateQueries({ queryKey: ['notice-detail', data.id] });
      handleEdit();
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Container
        onClick={(e) => e.stopPropagation()}
        onSubmit={methods.handleSubmit(onSumbit)}
      >
        <Typography variant="title3Bold">공지 수정</Typography>
        <FlexBox direction="column" gap={24}>
          <GridBox columnGap={16} columns={'80px 1fr'}>
            <Typography variant="headline1Bold">공지타입</Typography>
            <FlexBox align="center" gap={12}>
              <RadioGroup
                name="type"
                options={[
                  { label: '운영', value: 'OPERATION' },
                  { label: '세션', value: 'SESSION' },
                ]}
              />
              <SolidButton
                disabled={methods.watch('type') !== 'SESSION'}
                size="small"
                type="button"
                variant="secondary"
                onClick={() => setSelectSessionPopupOpen(true)}
              >
                세션 선택
              </SolidButton>
              {methods.watch('sessionId') && (
                <FlexBox flex={1}>
                  <Typography color="label-alternative" variant="body2Normal">
                    {selectedSession?.generation} / {selectedSession?.title} (
                    {dayjs(selectedSession?.date).format('YYYY.MM.DD')})
                  </Typography>
                </FlexBox>
              )}
            </FlexBox>
          </GridBox>
          <GridBox fullWidth columnGap={16} columns={'80px 1fr'}>
            <Typography variant="headline1Bold">제목</Typography>
            <TextInput
              {...methods.register('title')}
              maxLength={50}
              placeholder="제목을 입력하세요"
            />
          </GridBox>
          <GridBox
            fullWidth
            columnGap={16}
            columns={'80px 1fr'}
            height={'400px'}
          >
            <Typography variant="headline1Bold">내용</Typography>
            <InputWrapper>
              <TextInputBox
                {...methods.register('content')}
                height={400}
                maxLength={1000}
                placeholder="내용을 입력해주세요"
              />
              <Counter control={methods.control} maxCount={1000} />
            </InputWrapper>
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
      </Container>
      {selectSessionPopupOpen && (
        <SelectSessionPopup
          sessionId={methods.watch('sessionId')}
          onChangeSessionId={(id) => methods.setValue('sessionId', id)}
          onClose={() => setSelectSessionPopupOpen(false)}
        />
      )}
    </FormProvider>
  );
};

export default NoticeEdit;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  #radio-wrapper {
    display: flex;
    gap: 24px;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Counter: FC<{
  maxCount: number;
  control: Control<EditNoticeReq>;
}> = ({ control, maxCount }) => {
  const content = useWatch({ control, name: 'content' });
  return (
    <CounterWrapper>
      {content.length} / {maxCount}
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 4px;
  right: 4px;
`;
