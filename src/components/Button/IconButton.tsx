import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

import { iconButtonVariantStyles } from '@constants/buttonStyles';

import ButtonBase from './ButtonBase';

export type IconButtonVariant = 'normal' | 'outlined' | 'solid' | 'background';
export type IconButtonSize = 'normal' | 'small' | 'custom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  buttonType?: 'button' | 'reset' | 'submit' | undefined;
}

const IconButton: FC<Props> = (props) => {
  const {
    children,
    variant = 'normal',
    size = 'normal',
    disabled = false,
    buttonType = 'button',
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      $disabled={disabled}
      $size={size}
      $variant={variant}
      type={buttonType}
    >
      {children}
    </StyledButton>
  );
};

export default IconButton;

const StyledButton = styled(ButtonBase)<{
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;

  ${({ $variant, $size }) => iconButtonVariantStyles[$variant].default($size)}

  ${({ $variant, $size, $disabled }) =>
    $disabled && iconButtonVariantStyles[$variant].disabled?.($size)}
`;
