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
    width: 100px;
    box-sizing: border-box;
  }

  th {
    background-color: rgba(112, 115, 124, 0.08);
    border-top: 1px solid #aeb0b6;
    z-index: 2;
    position: sticky;
  }

  th.sticky-col-1 {
    position: sticky;
    left: 0;
    z-index: 3;
    background: #f3f4f6 !important;
  }

  th.sticky-col-2 {
    position: sticky;
    left: 100px;
    z-index: 3;
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
