import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import theme from 'styles/theme';

import SolidButton from '@compnents/Button/SolidButton';
import { useAuthStore } from '@stores/authStore';
import Logo from './Logo';
import SideNavList from './SideNavList';
import UserInfo from './UserInfo';

const SideNav: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearUserIdStorage = useAuthStore.persist.clearStorage;
  const resetToken = useAuthStore((state) => state.resetToken);

  const onClickToLogout = () => {
    navigate('/login');
    resetToken();
    clearUserIdStorage();
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Logo />
          <UserInfo authority="어드민" userName="김현정" />
          <SideNavList pathname={pathname} />
        </Wrapper>
        <SolidButton onClick={onClickToLogout} size="medium">
          로그아웃
        </SolidButton>
      </Container>
    </>
  );
};

export default SideNav;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 202px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: ${theme.colors.backgroundNormal.alternative};
  border-radius: 16px;

  button {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
`;
