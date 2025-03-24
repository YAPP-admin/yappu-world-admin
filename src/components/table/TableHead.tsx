import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const TableHead: FC<Props> = ({ children }) => {
  return <StyledHead>{children}</StyledHead>;
};

export default TableHead;

const StyledHead = styled.thead`
  th {
    padding: 8px 12px;
    background: rgba(112, 115, 124, 0.08);
    border-top: 1px solid #aeb0b6;
  }

  th:not(:last-child) {
    border-right: 1px solid #e1e2e4;
  }
`;
