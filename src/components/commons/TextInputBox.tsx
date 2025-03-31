import { forwardRef } from 'react';
import Typography from './Typography';
import styled from 'styled-components';

type TextInputSize = 'large' | 'medium';
type TextInputState = 'defatult' | 'active' | 'success';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  inputSize?: TextInputSize;
  status?: TextInputState;
  letterCount?: boolean;
  maxCount?: number;
  height?: string | number;
}

const TextInputBox = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      title,
      inputSize = 'large',
      status = 'defatult',
      letterCount = false,
      maxCount,
      height,
      value,
      ...rest
    },
    ref,
  ) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <Container height={height}>
        {title && <Typography variant="label1Normal">{title}</Typography>}
        <TextAreaWrapper>
          <textarea ref={ref} {...rest} />
          {/* {letterCount && (
            <CountWrapper>
              {currentLength} / {maxCount}
            </CountWrapper>
          )} */}
        </TextAreaWrapper>
      </Container>
    );
  },
);

export default TextInputBox;

const Container = styled.div<{ height?: string | number }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${({ height }) =>
    height
      ? `height: ${typeof height === 'number' ? `${height}px` : height};`
      : ''}
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

const CountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 2px;
  align-self: stretch;
`;
