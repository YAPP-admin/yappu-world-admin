import React, { FC } from 'react';
import styled from 'styled-components';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface FlexBoxProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  align?: AlignItems;
  justify?: JustifyContent;
  wrap?: FlexWrap;
  flex?: number | string;
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  padding?: string;
  margin?: string;
}

const FlexBox: FC<FlexBoxProps> = ({
  children,
  direction = 'row',
  gap,
  align = 'flex-start',
  justify = 'flex-start',
  wrap = 'nowrap',
  flex,
  width,
  height = 'fit-content',
  fullWidth,
  fullHeight,
  padding,
  margin,
}) => {
  return (
    <StyledFlexBox
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      flex={flex}
      width={width}
      height={height}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;

const StyledFlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-wrap: ${({ wrap }) => wrap};

  ${({ gap }) => gap !== undefined && `gap: ${gap}px;`}
  ${({ flex }) => flex !== undefined && `flex: ${flex};`}

  width: 100%;
  height: 100%;

  ${({ width }) =>
    width !== undefined &&
    `width: ${typeof width === 'number' ? `${width}px` : width};`}
  ${({ height }) =>
    height !== undefined &&
    `height: ${typeof height === 'number' ? `${height}px` : height};`}

  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;
