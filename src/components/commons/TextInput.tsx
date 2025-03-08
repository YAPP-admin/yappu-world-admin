import { View } from '@assets/View';
import { ViewSlash } from '@assets/ViewSlash';
import React, { useState } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

type TextInputSize = 'large' | 'medium';
type TextInputState = 'default' | 'active' | 'success' | 'error';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: TextInputSize;
  state?: TextInputState;
  title?: string;
  isShow?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { inputSize = 'large', state = 'default', isShow = false, title, ...rest },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisible = () => {
      setIsVisible((prev) => !prev);
    };

    const inputType =
      rest.type === 'password' && isVisible ? 'text' : rest.type;

    return (
      <Container>
        {title && <Label>{title}</Label>}
        <InputWrapper $inputSize={inputSize}>
          <Input ref={ref} {...rest} $inputSize={inputSize} type={inputType} />
          {isShow && (
            <IconWrapper onClick={handleVisible}>
              {isVisible ? <View /> : <ViewSlash />}
            </IconWrapper>
          )}
        </InputWrapper>
      </Container>
    );
  },
);

export default TextInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2;
  font-weight: 500;
`;

const InputWrapper = styled.div<{ $inputSize: TextInputSize }>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: ${({ $inputSize }) =>
    $inputSize === 'large' ? '10px' : '8px'};
  border: 1px solid ${theme.colors.lineNormal.normal};
`;

const Input = styled.input<{ $inputSize: TextInputSize }>`
  border: none;
  outline: none;
  font-size: ${({ $inputSize }) => ($inputSize === 'large' ? '16px' : '15px')};
  line-height: ${({ $inputSize }) =>
    $inputSize === 'large' ? '24px' : '22px'};
  letter-spacing: ${({ $inputSize }) =>
    $inputSize === 'large' ? '0.091pxpx' : '0.144pxpx'};
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;
