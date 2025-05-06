import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC } from 'react';
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import removeMarkdown from 'remove-markdown';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import TextInputBox from '@compnents/commons/TextInputBox';
import Typography from '@compnents/commons/Typography';
import { noticeOptionList } from '@constants/optionList';
import { useEditNoticeMutation } from '@queries/notice/useEditNoticeMutation';
import { useNoticeStore } from '@stores/noticeStore';
import { ErrorResponse } from 'apis/common/types';
import { EditNoticeReq, NoticeDetailRes } from 'apis/notice/types';
import { EditNoticeType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

interface Props {
  handleEdit: () => void;
  data: NoticeDetailRes | undefined;
}

const NoticeEdit: FC<Props> = ({ handleEdit, data }) => {
  const { register, handleSubmit, control } = useForm<EditNoticeType>({
    defaultValues: {
      id: data?.noticeId,
      type: data?.type,
      title: data?.title,
      content: data?.content,
      plainContent: '',
    },
  });
  const { mutateAsync } = useEditNoticeMutation();
  const setIsEditPopup = useNoticeStore((state) => state.setIsEditPopup);
  const queryClient = useQueryClient();

  const onSumbit = async (data: EditNoticeType) => {
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
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSumbit)}
    >
      <FlexBox direction="column" gap={40}>
        <Typography variant="title3Bold">공지 수정</Typography>
        <FlexBox direction="column" gap={24}>
          <GridBox columnGap={16} columns={'80px 1fr'}>
            <Typography variant="headline1Bold">공지타입</Typography>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  optionList={noticeOptionList}
                  size="large"
                  width="191px"
                  selectedValue={
                    noticeOptionList.find((item) => item.value === field.value)
                      ?.value ?? ''
                  }
                  onChange={field.onChange}
                />
              )}
            />
          </GridBox>
          <GridBox fullWidth columnGap={16} columns={'80px 1fr'}>
            <Typography variant="headline1Bold">제목</Typography>
            <TextInput
              {...register('title')}
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
                {...register('content')}
                height={400}
                maxLength={1000}
                placeholder="내용을 입력해주세요"
              />
              <Counter control={control} maxCount={1000} />
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
      </FlexBox>
    </form>
  );
};

export default NoticeEdit;

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
