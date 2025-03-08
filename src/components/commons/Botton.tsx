import { buttonSizeStyles } from '@constants/buttonStyles';
import { getButtonVariantStyle } from '@utils/getButtonVariantStyle';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';

export type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
export type ButtonVariant = 'contained' | 'outlined';
export type ButtonVariantType = 'primary' | 'secondary' | 'assistive';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  variant?: ButtonVariant;
  variantType: ButtonVariantType;
  text: string;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    text,
    buttonSize = 'medium',
    variant = 'contained',
    variantType = 'primary',
    ...rest
  } = props;
  return (
    <CustomButton
      $variant={variant}
      $buttonSize={buttonSize}
      $variantType={variantType}
      {...rest}
    >
      {text}
    </CustomButton>
  );
};

export default Button;

const CustomButton = styled.button<{
  $variant: ButtonVariant;
  $buttonSize: ButtonSize;
  $variantType: ButtonVariantType;
}>`
  ${({ $variant, $variantType, $buttonSize, disabled }) => css`
    ${buttonSizeStyles[$buttonSize]};
    ${getButtonVariantStyle($variant, $variantType, disabled)};
  `}
  font-weight: 600;
  cursor: pointer;
`;
