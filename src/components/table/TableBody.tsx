import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const TableBody: FC<Props> = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

export default TableBody;

const StyledBody = styled.tbody`
  td {
    padding: 4px 12px;
    border-bottom: 1px solid #e1e2e4;
  }

  td:not(:last-child) {
    border-right: 1px solid #e1e2e4;
  }
`;
