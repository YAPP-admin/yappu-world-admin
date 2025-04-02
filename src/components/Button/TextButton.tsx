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
}

const TextButton: FC<Props> = (props) => {
  const {
    leftIcon,
    rightIcon,
    children,
    variant = 'primary',
    size = 'small',
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
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
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: none;

  ${({ $size }) => textButtonSizeStyles[$size]}

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return css`
        color: #fa6027;

        &:disabled {
          color: rgba(55, 56, 60, 0.16);
        }
      `;
    }

    if ($variant === 'assistive') {
      return css`
        color: rgba(55, 56, 60, 0.61);

        &:disabled {
          color: rgba(55, 56, 60, 0.16);
        }
      `;
    }
  }}
`;
