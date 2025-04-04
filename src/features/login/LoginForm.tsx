import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useLoginMutation } from '@queries/auth/useLoginMutation';
import { LoginType } from 'types/formTypes';

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    setError,
    watch,
  } = useForm<LoginType>({
    mode: 'onChange',
  });

  const { mutate } = useLoginMutation(setError);

  const onSubmit = (data: LoginType) => {
    mutate(data);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <InputArea>
        <FlexBox direction="column" gap={5}>
          <TextInput
            {...register('email', {
              required: true,
            })}
            autoComplete="on"
            placeholder="이메일을 입력해주세요."
            title="이메일"
            state={
              errors.email && !!watch('email')
                ? 'error'
                : watch('email')
                  ? 'success'
                  : 'default'
            }
          />
          {errors.email && !!watch('email') && (
            <Typography color="status-negative" variant="caption1Regular">
              {errors.email.message}
            </Typography>
          )}
        </FlexBox>
        <FlexBox direction="column" gap={5}>
          <TextInput
            {...register('password', {
              required: true,
            })}
            isShow
            autoComplete="on"
            placeholder="비밀번호를 입력해주세요."
            title="비밀번호"
            type="password"
            state={
              errors.email && !!watch('password')
                ? 'error'
                : watch('password')
                  ? 'success'
                  : 'default'
            }
          />
          {errors.password && (
            <Typography color="status-negative" variant="caption1Regular">
              {errors.password.message}
            </Typography>
          )}{' '}
        </FlexBox>
      </InputArea>

      <SolidButton
        disabled={!isValid || isSubmitting}
        size="xlarge"
        type="submit"
      >
        로그인
      </SolidButton>
    </Wrapper>
  );
};

export default LoginForm;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
