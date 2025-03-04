import Logo from '@compnents/commons/Logo';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const Login: FC = () => {
  return (
    <div>
      <Title>
        <Logo />
        <span>App 관리자</span>
      </Title>
    </div>
  );
};

export default Login;

const Container = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
  }
`;
