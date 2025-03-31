import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import TextInputBox from '@compnents/commons/TextInputBox';
import Typography from '@compnents/commons/Typography';
import { useEditNoticeMutation } from '@queries/notice/useEditNoticeMutation';
import { EditNoticeReq, NoticeDetailRes } from 'apis/notice/types';
import { FC } from 'react';
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import removeMarkdown from 'remove-markdown';
import styled from 'styled-components';

interface Props {
  handleEdit: () => void;
  data: NoticeDetailRes | undefined;
}

const NoticeEdit: FC<Props> = ({ handleEdit, data }) => {
  const { register, handleSubmit, control, watch } = useForm<EditNoticeReq>({
    defaultValues: {
      id: data?.noticeId,
      type: data?.type,
      title: data?.title,
      content: data?.content,
      plainContent: '',
    },
  });
  const { mutate } = useEditNoticeMutation();

  const onSumbit = (data: EditNoticeReq) => {
    const plainText = removeMarkdown(data.content).replaceAll(
      /[\x00-\x1F\x7F]/g,
      '',
    );
    const newData = { ...data, planContent: plainText };
    console.log(newData);
    // mutate(newData);
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
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  size="large"
                  width="191px"
                  selectedValue={field.value}
                  optionList={['전체', '운영', '세션']}
                  onChange={field.onChange}
                />
              )}
            />
          </GridBox>
          <GridBox columnGap={16} columns={'80px 1fr'} fullWidth>
            <Typography variant="headline1Bold">제목</Typography>
            <TextInput
              {...register('title')}
              placeholder="제목을 입력하세요"
              maxLength={50}
            />
          </GridBox>
          <GridBox
            columnGap={16}
            columns={'80px 1fr'}
            fullWidth
            height={'400px'}
          >
            <Typography variant="headline1Bold">내용</Typography>
            <InputWrapper>
              <TextInputBox
                {...register('content')}
                placeholder="내용을 입력해주세요"
                height={400}
                letterCount
                maxLength={1000}
                maxCount={1000}
              />
              <Counter control={control} maxCount={1000} />
            </InputWrapper>
          </GridBox>
        </FlexBox>
        <FlexBox gap={8} justify="flex-end">
          <OutlinedButton variant="assistive" onClick={handleEdit} size="large">
            취소
          </OutlinedButton>
          <SolidButton type="submit" size="large">
            저장
          </SolidButton>
        </FlexBox>
      </FlexBox>
    </form>
  );
};

export default NoticeEdit;

const Container = styled.form`
  display: flex;
  /* width: 1206px; */
  /* height: 1024px; */
  padding: 32px 40px;
  flex-direction: column;
  gap: 40px;
  flex-shrink: 0;
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
