import React, { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

import { sizeStyles } from '@constants/buttonStyles';

import ButtonBase from './ButtonBase';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

const SolidButton: FC<Props> = (props) => {
  const {
    leftIcon,
    rightIcon,
    children,
    variant = 'primary',
    size = 'small',
    disabled = false,
    type,
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      $disabled={disabled}
      $size={size}
      type={type}
      $variant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </StyledButton>
  );
};

export default SolidButton;

const StyledButton = styled(ButtonBase)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;

  ${({ $size }) => sizeStyles[$size]}

  ${({ $variant, $disabled }) => {
    if ($variant === 'primary') {
      return $disabled
        ? css`
            background: #f4f4f5;
            color: rgba(55, 56, 60, 0.28);
          `
        : css`
            background: #fa6027;
            color: #ffffff;
          `;
    }

    if ($variant === 'secondary') {
      return $disabled
        ? css`
            background: #fff8f5;
            color: #fdbba2;
          `
        : css`
            background: #ffefe9;
            color: #fa6027;
          `;
    }
  }}
`;
