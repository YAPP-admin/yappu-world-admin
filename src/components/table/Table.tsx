import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StyledTable: FC<Props> = ({ children }) => {
  return <Table>{children}</Table>;
};

export default StyledTable;

const Table = styled.table`
  /* border: 1px solid; */
  width: 100%;
  border-spacing: 0;
`;
