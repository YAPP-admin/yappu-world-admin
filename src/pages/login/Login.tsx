import { FC } from 'react';
import styled from 'styled-components';

import Logo from '@compnents/commons/Logo';
import Typography from '@compnents/commons/Typography';
import LoginForm from 'features/login/LoginForm';

const Login: FC = () => {
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
      <LoginForm />
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
