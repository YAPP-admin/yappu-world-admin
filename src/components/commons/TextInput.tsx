import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { View } from '@assets/View';
import { ViewSlash } from '@assets/ViewSlash';
import theme from 'styles/theme';

import Typography from './Typography';

type TextInputSize = 'large' | 'medium';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: TextInputSize;
  title?: string;
  isShow?: boolean;
  unitText?: string;
  width?: string;
  borderColor?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputSize = 'large',
      isShow = false,
      title,
      unitText,
      width,
      borderColor,
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisible = () => {
      setIsVisible((prev) => !prev);
    };

    const inputType =
      rest.type === 'password' && isVisible ? 'text' : rest.type;

    return (
      <Container width={width}>
        {title && <Typography variant="label1Normal">{title}</Typography>}
        <InputWrapper $inputSize={inputSize} border={borderColor}>
          <Input ref={ref} {...rest} $inputSize={inputSize} type={inputType} />
          {isShow && (
            <IconWrapper onClick={handleVisible}>
              {isVisible ? <View /> : <ViewSlash />}
            </IconWrapper>
          )}
          {unitText && <UnitText>{unitText}</UnitText>}
        </InputWrapper>
      </Container>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;

const Container = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ width }) => (width ? width : '100%')};
`;

const InputWrapper = styled.div<{
  $inputSize: TextInputSize;
  border?: string;
}>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: ${({ $inputSize }) =>
    $inputSize === 'large' ? '10px' : '8px'};
  border: ${({ border }) =>
    border
      ? `1px solid ${border}`
      : `1px solid ${theme.colors.lineNormal.normal}`};
  width: 100%;
  box-sizing: border-box;
  height: ${({ $inputSize }) => ($inputSize === 'large' ? '48px' : '40px')};
`;

const Input = styled.input<{ $inputSize: TextInputSize }>`
  border: none;
  outline: none;
  font-size: ${({ $inputSize }) => ($inputSize === 'large' ? '16px' : '15px')};
  line-height: ${({ $inputSize }) =>
    $inputSize === 'large' ? '24px' : '22px'};
  letter-spacing: ${({ $inputSize }) =>
    $inputSize === 'large' ? '0.091px' : '0.144px'};
  width: 100%;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const UnitText = styled.span`
  color: ${theme.colors.label.assistive};
  font-size: 15px;
  font-style: normal;
  line-height: 22px;
  letter-spacing: 0.144px;
`;
