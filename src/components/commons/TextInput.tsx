import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { View } from '@assets/View';
import { ViewSlash } from '@assets/ViewSlash';
import theme from 'styles/theme';

import Typography from './Typography';
import IconButton from '@compnents/Button/IconButton';
import CircleClose from '@assets/CircleClose';

type TextInputSize = 'large' | 'medium';
type State = 'default' | 'active' | 'error' | 'success';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: TextInputSize;
  title?: string;
  isShow?: boolean;
  unitText?: string;
  width?: string;
  state?: State;
  remove?: boolean;
  onRemove?: () => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputSize = 'large',
      isShow = false,
      title,
      unitText,
      width,
      state,
      remove,
      onRemove,
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
        <InputWrapper $inputSize={inputSize} $state={state}>
          <Input ref={ref} {...rest} $inputSize={inputSize} type={inputType} />
          {isShow && (
            <IconWrapper onClick={handleVisible}>
              {isVisible ? <View /> : <ViewSlash />}
            </IconWrapper>
          )}
          {unitText && <UnitText>{unitText}</UnitText>}
          {remove && (
            <IconButton onClick={onRemove}>
              <CircleClose color={theme.colors.label.assistive} />
            </IconButton>
          )}
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
  $state?: State;
}>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: ${({ $inputSize }) =>
    $inputSize === 'large' ? '10px' : '8px'};
  border: 1px solid
    ${({ $state }) => {
      switch ($state) {
        case 'active':
          return theme.colors.primary.normal;
        case 'success':
          return theme.colors.lineNormal.strong;
        case 'error':
          return theme.colors.status.nagative;
        case 'default':
        default:
          return theme.colors.lineNormal.normal;
      }
    }};
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

  &:disabled {
    background: none;
  }
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
