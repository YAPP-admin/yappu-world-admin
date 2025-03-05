import React, { FC } from 'react';
import styled from 'styled-components';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
