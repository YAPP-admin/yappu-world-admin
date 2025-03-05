import Button from '@compnents/commons/Botton';
import Logo from '@compnents/commons/Logo';
import TextInput from '@compnents/commons/TextInput';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const Login: FC = () => {
  return (
    <Container>
      <Title>
        <Logo />
        <span>App 관리자</span>
      </Title>
      <Wrapper>
        <InputArea>
          <TextInput title="이메일" placeholder="이메일을 입력해주세요." />
          <TextInput
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

  span {
    font-size: ${theme.typography.title3Bold.fontSize};
    line-height: ${theme.typography.title3Bold.lineHeight};
    letter-spacing: ${theme.typography.title3Bold.letterSpacing};
    font-weight: ${theme.typography.title3Bold.fontWeight};
  }
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
