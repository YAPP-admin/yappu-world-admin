import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '@compnents/commons/Button';
import Logo from '@compnents/commons/Logo';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useLoginMutation } from '@queries/auth/useLoginMutation';
import { LoginReq } from 'apis/auth/types';

const Login: FC = () => {
  const { register, handleSubmit } = useForm<LoginReq>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginReq) => {
    console.log('submit data :', data);
    mutate(data);
  };

  return (
    <Container>
      <Title>
        <Logo
          iconHeight="32"
          iconWidth="32"
          textHeight="16.8"
          textWidth="64.2"
        />
        <Typography variant="title3Bold">App 관리자</Typography>
      </Title>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <InputArea>
          <TextInput
            {...register('email')}
            placeholder="이메일을 입력해주세요."
            title="이메일"
          />
          <TextInput
            {...register('password')}
            isShow
            placeholder="비밀번호를 입력해주세요."
            title="비밀번호"
            type="password"
          />
        </InputArea>
        <Button
          buttonSize="xlarge"
          buttonType="submit"
          text="로그인"
          variant="contained"
          variantType="primary"
        />
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  width: 414px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

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
