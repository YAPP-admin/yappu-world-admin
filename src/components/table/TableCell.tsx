import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  as?: 'th' | 'td';
  scope?: 'row' | 'col';
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

const TableCell: FC<Props> = (props) => {
  const { children, as = 'td', scope, align = 'center' } = props;

  return (
    <StyledTableCell align={align} as={as}>
      <Wrapper>{children}</Wrapper>
    </StyledTableCell>
  );
};

export default TableCell;

const StyledTableCell = styled.td<{ align: string }>`
  text-align: ${({ align }) => align};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
