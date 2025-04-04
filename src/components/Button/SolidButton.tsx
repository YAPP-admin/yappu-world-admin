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
}

const SolidButton: FC<Props> = (props) => {
  const {
    leftIcon,
    rightIcon,
    children,
    variant = 'primary',
    size = 'small',
    type,
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      $size={size}
      $variant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default SolidButton;

const StyledButton = styled(ButtonBase)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;

  ${({ $size }) => sizeStyles[$size]}

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return css`
        background: #fa6027;
        color: #ffffff;

        &:disabled {
          background: #f4f4f5;
          color: rgba(55, 56, 60, 0.28);
        }
      `;
    }

    if ($variant === 'secondary') {
      return css`
        background: #ffefe9;
        color: #fa6027;

        &:disabled {
          background: #fff8f5;
          color: #fdbba2;
        }
      `;
    }
  }}
`;
