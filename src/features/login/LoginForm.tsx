import { isAxiosError } from 'axios';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useLoginMutation } from '@queries/auth/useLoginMutation';
import { useUserProfileQuery } from '@queries/user/useUserProfileQuery';
import { useAuthStore } from '@stores/authStore';
import { ErrorResponse } from 'apis/common/types';
import { LoginType } from 'types/formTypes';

// enum LoginErrorCode {
//   Unknown1 = 'USR_1101',
//   Unknown2 = 'USR_1102',
//   Unknown3 = 'USR_1103',
//   Unknown4 = 'USR_1104',
//   Unknown5 = 'USR_1105',
// }

// const ERROR_MSG: Record<LoginErrorCode, string> = {
//   [LoginErrorCode.Unknown1]: '',
//   [LoginErrorCode.Unknown2]: '',
//   [LoginErrorCode.Unknown3]: '',
//   [LoginErrorCode.Unknown4]: '',
//   [LoginErrorCode.Unknown5]: '',
// };

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

  const { mutateAsync } = useLoginMutation();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const navigate = useNavigate();
  const { refetch } = useUserProfileQuery();

  const onSubmit = async (data: LoginType) => {
    try {
      const loginRes = await mutateAsync(data);
      setToken(loginRes.data.data);
      const { data: profileData } = await refetch();
      if (profileData) {
        setUserProfile(profileData);
        navigate('/admin/members/list');
      }
    } catch (error) {
      console.log('error :', error);
      if (isAxiosError<ErrorResponse>(error)) {
        const { errorCode, message } = error.response?.data || {};
        switch (errorCode) {
          case 'USR_1101':
            setError('email', {
              type: 'manual',
              message: message || '등록되지 않은 이메일입니다.',
            });
            break;
          case 'USR_1105':
            setError('password', {
              type: 'manual',
              message: message || '비밀번호가 올바르지 않습니다.',
            });
            break;
          case 'USR_1102':
          case 'USR_1103':
          case 'USR_1104':
            window.alert(message || '로그인이 불가능한 회원입니다.');
            break;
          default:
            window.alert(message || '알 수 없는 오류가 발생했습니다.');
        }
      }
    }
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
