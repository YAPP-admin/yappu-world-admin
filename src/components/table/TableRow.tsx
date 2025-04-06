import { FC } from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const TableRow: FC<Props> = ({ children, ...rest }) => {
  return <StyledRow {...rest}>{children}</StyledRow>;
};

export default TableRow;

const StyledRow = styled.tr`
  cursor: pointer;
`;
