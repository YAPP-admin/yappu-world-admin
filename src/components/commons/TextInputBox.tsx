import { forwardRef } from 'react';
import styled from 'styled-components';

import Typography from './Typography';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  height?: string | number;
  width?: string | number;
}

const TextInputBox = forwardRef<HTMLTextAreaElement, Props>(
  ({ title, height, width, ...rest }, ref) => {
    return (
      <Container height={height} width={width}>
        {title && <Typography variant="label1Normal">{title}</Typography>}
        <TextAreaWrapper>
          <textarea ref={ref} {...rest} />
        </TextAreaWrapper>
      </Container>
    );
  },
);

TextInputBox.displayName = 'TextInputBox';

export default TextInputBox;

const Container = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${({ height }) =>
    height
      ? `height: ${typeof height === 'number' ? `${height}px` : height};`
      : ''}

  ${({ width }) =>
    width ? `width: ${typeof width === 'number' ? `${width}px` : width};` : ''}
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  flex: 1 0 0;
  border-radius: 10px;
  border: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));

  textarea {
    flex: 1;
    resize: none;
    width: 100%;
    border: none;
    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.091px;
  }

  textarea:focus {
    outline: none;
  }
`;
