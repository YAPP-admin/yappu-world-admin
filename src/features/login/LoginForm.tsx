import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useLoginMutation } from '@queries/auth/useLoginMutation';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
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
  //   const emailValue = useWatch({ name: 'email' }); // 👈 실시간으로 안정적으로 값 추적

  const onSubmit = (data: LoginType) => {
    console.log('submit data :', data);
    mutate(data);
  };
  console.log('email ', watch('email'), ', boolean ', !!watch('email'));
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <InputArea>
        <FlexBox direction="column" gap={5}>
          <TextInput
            {...register('email', {
              required: true,
            })}
            placeholder="이메일을 입력해주세요."
            title="이메일"
            autoComplete="on"
            state={
              errors.email && !!watch('email')
                ? 'error'
                : !!watch('email')
                  ? 'success'
                  : 'default'
            }
          />
          {errors.email && !!watch('email') && (
            <Typography variant="caption1Regular" color="status-negative">
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
            placeholder="비밀번호를 입력해주세요."
            title="비밀번호"
            type="password"
            autoComplete="on"
            state={
              errors.email && !!watch('password')
                ? 'error'
                : !!watch('password')
                  ? 'success'
                  : 'default'
            }
          />
          {errors.password && (
            <Typography variant="caption1Regular" color="status-negative">
              {errors.password.message}
            </Typography>
          )}{' '}
        </FlexBox>
      </InputArea>

      <SolidButton
        size="xlarge"
        type="submit"
        disabled={!isValid || isSubmitting}
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
