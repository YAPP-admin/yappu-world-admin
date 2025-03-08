import { FC } from 'react';
import styled from 'styled-components';
import Button from './Botton';
import theme from 'styles/theme';
import Logo from './Logo';
import UserInfo from './UserInfo';
import SideNavList from './SideNavList';
import { useLocation } from 'react-router-dom';

const SideNav: FC = () => {
  const { pathname } = useLocation();
  return (
    <Container>
      <Wrapper>
        <Logo />
        <UserInfo authority="어드민" userName="김현정" />
        <SideNavList pathname={pathname} />
      </Wrapper>
      <Button
        text="로그아웃"
        variant="contained"
        variantType="primary"
        buttonSize="medium"
        style={{ width: '100%' }}
      ></Button>
    </Container>
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
`;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
`;
