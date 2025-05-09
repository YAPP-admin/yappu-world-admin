import React, { FC } from 'react';
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
  style?: React.CSSProperties;
  max?: boolean;
}

const TableCell: FC<Props> = (props) => {
  const {
    children,
    as = 'td',
    align = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    max = false,
    style,
    ...rest
  } = props;

  return (
    <StyledTableCell {...rest} $max={max} align={align} as={as} style={style}>
      <Wrapper $alignItems={alignItems} $justifyContent={justifyContent}>
        {children}
      </Wrapper>
    </StyledTableCell>
  );
};

export default TableCell;

const StyledTableCell = styled.td<{ align: string; $max?: boolean }>`
  text-align: ${({ align }) => align};
  width: ${({ $max }) => ($max ? '140px' : '100px')};
  min-width: ${({ $max }) => ($max ? '140px' : '100px')};
  max-width: ${({ $max }) => ($max ? '140px' : '100px')};
  box-sizing: border-box;
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
