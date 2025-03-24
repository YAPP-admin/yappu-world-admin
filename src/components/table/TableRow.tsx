import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const TableRow: FC<Props> = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default TableRow;

const StyledRow = styled.tr``;
