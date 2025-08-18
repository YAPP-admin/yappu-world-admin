import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import { useLogout } from '@hooks/useLogout';
import { useAuthStore } from '@stores/authStore';
import theme from 'styles/theme';

import Logo from './Logo';
import SideNavList from './SideNavList';
import UserInfo from './UserInfo';

const SideNav: FC = () => {
  const { pathname } = useLocation();
  const userProfile = useAuthStore((state) => state.userProfile);

  const logout = useLogout();

  return (
    <>
      <Container>
        <Wrapper>
          <Logo />
          <UserInfo userProfile={userProfile} />
          <SideNavList pathname={pathname} />
        </Wrapper>
        <SolidButton size="medium" onClick={logout}>
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
  width: 100%;
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
