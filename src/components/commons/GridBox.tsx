import React, { FC } from 'react';
import styled from 'styled-components';

interface GridBoxProps {
  children: React.ReactNode;
  columns?: number | string; // ex: 3 or "1fr 1fr 2fr"
  rows?: number | string; // ex: "auto auto" or 2
  gap?: number | string;
  columnGap?: number | string;
  rowGap?: number | string;
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  padding?: string;
  margin?: string;
  align?: string; // align-items
  justify?: string; // justify-items
}

const GridBox: FC<GridBoxProps> = ({
  children,
  columns,
  rows,
  gap,
  columnGap,
  rowGap,
  width,
  height,
  fullWidth,
  fullHeight,
  padding,
  margin,
  align,
  justify,
}) => {
  return (
    <StyledGridBox
      align={align}
      columnGap={columnGap}
      columns={columns}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
      gap={gap}
      height={height}
      justify={justify}
      margin={margin}
      padding={padding}
      rowGap={rowGap}
      rows={rows}
      width={width}
    >
      {children}
    </StyledGridBox>
  );
};

export default GridBox;

const StyledGridBox = styled.div<GridBoxProps>`
  display: grid;

  ${({ columns }) =>
    columns &&
    `grid-template-columns: ${
      typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
    };`}

  ${({ rows }) =>
    rows &&
    `grid-template-rows: ${
      typeof rows === 'number' ? `repeat(${rows}, auto)` : rows
    };`}

  ${({ gap }) =>
    gap !== undefined && `gap: ${typeof gap === 'number' ? `${gap}px` : gap};`}
  ${({ rowGap }) =>
    rowGap !== undefined &&
    `row-gap: ${typeof rowGap === 'number' ? `${rowGap}px` : rowGap};`}
  ${({ columnGap }) =>
    columnGap !== undefined &&
    `column-gap: ${typeof columnGap === 'number' ? `${columnGap}px` : columnGap};`}

  ${({ align }) => align && `align-items: ${align};`}
  ${({ justify }) => justify && `justify-items: ${justify};`}

  ${({ width, fullWidth }) =>
    fullWidth
      ? 'width: 100%;'
      : width
        ? `width: ${typeof width === 'number' ? `${width}px` : width};`
        : ''}

  ${({ height, fullHeight }) =>
    fullHeight
      ? 'height: 100%;'
      : height
        ? `height: ${typeof height === 'number' ? `${height}px` : height};`
        : ''}

  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;
