import React, { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

import { textButtonSizeStyles } from '@constants/buttonStyles';

import ButtonBase from './ButtonBase';

type ButtonVariant = 'primary' | 'assistive';
type ButtonSize = 'medium' | 'small';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

const TextButton: FC<Props> = (props) => {
  const {
    leftIcon,
    rightIcon,
    children,
    variant = 'primary',
    size = 'small',
    disabled = false,
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      $disabled={disabled}
      $size={size}
      $variant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </StyledButton>
  );
};

export default TextButton;

const StyledButton = styled(ButtonBase)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: none;

  ${({ $size }) => textButtonSizeStyles[$size]}

  ${({ $variant, $disabled }) => {
    if ($variant === 'primary') {
      return $disabled
        ? css`
            color: rgba(55, 56, 60, 0.16);
          `
        : css`
            color: #fa6027;
          `;
    }

    if ($variant === 'assistive') {
      return $disabled
        ? css`
            color: rgba(55, 56, 60, 0.16);
          `
        : css`
            color: rgba(55, 56, 60, 0.61);
          `;
    }
  }}
`;
