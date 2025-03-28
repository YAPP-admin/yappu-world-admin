import { FC } from 'react';
import styled from 'styled-components';

type AlignItems = 'flex-start' | 'flex-end' | 'center';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';

interface Props {
  as?: 'th' | 'td';
  scope?: 'row' | 'col';
  align?: 'left' | 'center' | 'right';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  children?: React.ReactNode;
}

const TableCell: FC<Props> = (props) => {
  const {
    children,
    as = 'td',
    scope,
    align = 'center',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
  } = props;

  return (
    <StyledTableCell align={align} as={as}>
      <Wrapper $alignItems={alignItems} $justifyContent={justifyContent}>
        {children}
      </Wrapper>
    </StyledTableCell>
  );
};

export default TableCell;

const StyledTableCell = styled.td<{ align: string }>`
  text-align: ${({ align }) => align};
`;

const Wrapper = styled.div<{
  $alignItems: AlignItems;
  $justifyContent: JustifyContent;
}>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};
`;
