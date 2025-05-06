import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Table: FC<Props> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default Table;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;

  th,
  td {
    min-width: 100px;
    max-width: 130px;
    box-sizing: border-box;
  }

  th {
    background-color: rgba(112, 115, 124, 0.08);
    border-top: 1px solid #aeb0b6;
    position: sticky;
  }

  td {
    padding: 4px 12px;
    border-bottom: 1px solid #e1e2e4;
  }

  td:not(:last-child) {
    border-right: 1px solid #e1e2e4;
  }

  th.sticky-col-1 {
    position: sticky;
    left: 0;
    z-index: 1;
    background: #f3f4f6 !important;
  }

  th.sticky-col-2 {
    position: sticky;
    left: 100px;
    z-index: 1;
    background: #f3f4f6 !important;
  }

  td.sticky-col-1 {
    position: sticky;
    left: 0;
    z-index: 1;
    background: #fff;
  }

  td.sticky-col-2 {
    position: sticky;
    left: 100px;
    z-index: 1;
    background: #fff;
  }
`;
