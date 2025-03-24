import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

export type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ButtonBase: FC<ButtonBaseProps> = ({
  children,
  rightIcon,
  leftIcon,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </StyledButton>
  );
};

export default ButtonBase;

const StyledButton = styled.button`
  cursor: pointer;
`;
