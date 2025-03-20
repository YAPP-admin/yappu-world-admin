import Button from '@compnents/commons/Botton';
import Logo from '@compnents/commons/Logo';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { useLoginMutation } from '@queries/auth/useLoginMutation';
import { LoginReq } from 'apis/auth/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
          iconWidth="32"
          iconHeight="32"
          textWidth="64.2"
          textHeight="16.8"
        />
        <Typography children="App 관리자" variant="title3Bold" />
      </Title>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <InputArea>
          <TextInput
            {...register('email')}
            title="이메일"
            placeholder="이메일을 입력해주세요."
          />
          <TextInput
            {...register('password')}
            title="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isShow
          />
        </InputArea>
        <Button
          text="로그인"
          variantType="primary"
          variant="contained"
          buttonSize="xlarge"
          buttonType="submit"
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
