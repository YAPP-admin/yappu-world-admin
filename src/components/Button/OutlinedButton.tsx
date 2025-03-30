import {
  assistiveStyleMap,
  defaultGapMap,
  outlinedSizeStyles,
} from '@constants/buttonStyles';
import React, { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import ButtonBase from './ButtonBase';
import theme from 'styles/theme';
import { semanticColor, SemanticColorKey } from 'styles/colors/semantic';

type ButtonVariant = 'primary' | 'secondary' | 'assistive';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  color?: SemanticColorKey;
  buttonType?: 'button' | 'reset' | 'submit' | undefined;
}

const OutlinedButton: FC<Props> = (props) => {
  const {
    leftIcon,
    rightIcon,
    children,
    variant = 'primary',
    size = 'small',
    disabled = false,
    color,
    buttonType = 'button',
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      $variant={variant}
      $disabled={disabled}
      $size={size}
      $color={color}
      type={buttonType}
    >
      {children}
    </StyledButton>
  );
};

export default OutlinedButton;

const StyledButton = styled(ButtonBase)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled: boolean;
  $color?: SemanticColorKey;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #fff;

  ${({ $size }) => outlinedSizeStyles[$size]}

  ${({ $variant, $size }) =>
    $variant === 'assistive'
      ? assistiveStyleMap[$size]
      : css`
          gap: ${defaultGapMap[$size]};
        `}
  
    ${({ $variant, $disabled, $color }) => {
    if ($disabled) {
      return css`
        color: ${theme.colors.label.disable};
        border: 1px solid ${theme.colors.lineNormal.normal};
      `;
    }

    const defaultColor =
      $variant === 'primary' || $variant === 'secondary'
        ? theme.colors.primary.normal
        : theme.colors.label.normal;

    const borderColor =
      $variant === 'primary'
        ? theme.colors.primary.normal
        : theme.colors.lineNormal.normal;

    return css`
      color: ${$color ? semanticColor[$color] : defaultColor};
      border: 1px solid ${borderColor};
    `;
  }}
`;
