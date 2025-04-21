import { FC } from 'react';
import styled from 'styled-components';

type AlignItems = 'flex-start' | 'flex-end' | 'center';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';

interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
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
    align = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    ...rest
  } = props;

  return (
    <StyledTableCell {...rest} align={align} as={as}>
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
  width: 100%;
`;
