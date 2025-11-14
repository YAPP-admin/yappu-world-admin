import { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

export type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ children, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {leftIcon}
        {children}
        {rightIcon}
      </StyledButton>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';
export default ButtonBase;

const StyledButton = styled.button`
  cursor: pointer;
  white-space: nowrap;
`;
