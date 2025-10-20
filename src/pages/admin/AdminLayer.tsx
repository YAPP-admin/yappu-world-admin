import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import SideNav from '@compnents/commons/SideNav';

const AdminLayer: FC = () => {
  return (
    <Container>
      <SideNavWrapper>
        <SideNav />
      </SideNavWrapper>
      <Outlet />
    </Container>
  );
};

export default AdminLayer;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const SideNavWrapper = styled.div`
  box-sizing: border-box;
  padding: 16px;
`;
