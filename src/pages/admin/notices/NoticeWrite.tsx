import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC } from 'react';
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import removeMarkdown from 'remove-markdown';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import TextInputBox from '@compnents/commons/TextInputBox';
import Typography from '@compnents/commons/Typography';
import { noticeOptionList } from '@constants/optionList';
import { useNewNoticeMutation } from '@queries/notice/useNewNoticeMutation';
import { useNoticeStore } from '@stores/noticeStore';
import { ErrorResponse } from 'apis/common/types';
import { BaseNoticeReq } from 'apis/notice/types';
import { BaseNoticeType } from 'types/formTypes';
import { showErrorToast } from 'types/showErrorToast';

const NoticeWrite: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch } = useForm<BaseNoticeType>({
    defaultValues: {
      type: undefined,
      title: '',
      content: '',
      plainContent: '',
    },
  });
  const { mutateAsync } = useNewNoticeMutation();
  const queryClient = useQueryClient();
  const onClickBack = () => {
    navigate('/admin/notices');
  };
  const setIsAddNoticeComplete = useNoticeStore(
    (state) => state.setIsAddNoticeComplete,
  );

  const onSumbit = async (data: BaseNoticeType) => {
    const plainText = removeMarkdown(data.content).replaceAll(
      // eslint-disable-next-line no-control-regex
      /[\x00-\x1F\x7F]/g,
      '',
    );
    const newData = { ...data, plainContent: plainText };
    try {
      const req: BaseNoticeReq = newData;
      const res = await mutateAsync(req);
      const location = res.headers['location'];
      const id = location?.split('/').pop();
      setIsAddNoticeComplete(true);
      queryClient.invalidateQueries({ queryKey: ['notice-detail', id] });
      navigate(`/admin/notices/detail/${id}`);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        showErrorToast(
          err.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
        );
      }
    }
  };

  return (
    <Container
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSumbit)}
    >
      <FlexBox direction="column" gap={24}>
        <IconButton variant="outlined" onClick={onClickBack}>
          <ArrowLeft size="20" />
        </IconButton>
        <Typography variant="title3Bold">새 공지 작성</Typography>
      </FlexBox>
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
        <GridBox fullWidth columnGap={16} columns={'80px 1fr'} height={'400px'}>
          <Typography variant="headline1Bold">내용</Typography>
          <InputWrapper>
            <TextInputBox
              {...register('content')}
              height={400}
              maxLength={2000}
              placeholder="내용을 입력해주세요"
            />
            <Counter control={control} maxCount={2000} />
          </InputWrapper>
        </GridBox>
      </FlexBox>
      <FlexBox gap={16} justify="flex-end">
        <OutlinedButton size="large" variant="assistive">
          취소
        </OutlinedButton>
        <SolidButton
          disabled={!(watch('type') && watch('title') && watch('content'))}
          size="large"
          type="submit"
        >
          저장
        </SolidButton>
      </FlexBox>
    </Container>
  );
};

export default NoticeWrite;

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
  control: Control<BaseNoticeReq>;
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
