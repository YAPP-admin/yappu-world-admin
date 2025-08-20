import React, { FC } from 'react';
import styled from 'styled-components';

type AlignItems = 'flex-start' | 'flex-end' | 'center';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';
type WidthType = 'default' | 'max' | 'fixed';

interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
  as?: 'th' | 'td';
  scope?: 'row' | 'col';
  align?: 'left' | 'center' | 'right';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  widthType?: WidthType;
  colSpan?: number;
}

const TableCell: FC<Props> = (props) => {
  const {
    children,
    as = 'td',
    align = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    style,
    widthType = 'default',
    ...rest
  } = props;

  return (
    <StyledTableCell
      {...rest}
      $widthType={widthType}
      align={align}
      as={as}
      style={style}
    >
      <Wrapper $alignItems={alignItems} $justifyContent={justifyContent}>
        {children}
      </Wrapper>
    </StyledTableCell>
  );
};

export default TableCell;

// const StyledTableCell = styled.td<{ align: string; $max?: boolean }>`
//   text-align: ${({ align }) => align};
//   width: ${({ $max }) => ($max ? '140px' : '100px')};
//   min-width: ${({ $max }) => ($max ? '140px' : '100px')};
//   max-width: ${({ $max }) => ($max ? '140px' : '100px')};
//   box-sizing: border-box;
// `;

const StyledTableCell = styled.td<{ align: string; $widthType?: WidthType }>`
  text-align: ${({ align }) => align};
  ${({ $widthType }) => {
    switch ($widthType) {
      case 'max':
        return `
          width: 140px;
          min-width: 140px;
          max-width: 140px;
          white-space: nowrap;
        `;
      case 'fixed':
        return `
          width: 100px;
          min-width: 100px;
          max-width: 100px;
          white-space: nowrap;
        `;
      default:
        return `
          width: auto;
          min-width: auto;
          max-width: none;
          word-break: break-all;
          overflow-wrap: break-word;
        `;
    }
  }}
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
