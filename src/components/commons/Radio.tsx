import { forwardRef } from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  color?: string;
  checked?: boolean;
  onChange?: () => void;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      color = '#E56738',
      checked = false,
      disabled = false,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <Container disabled={disabled}>
        <HiddenInput
          ref={ref}
          checked={checked}
          disabled={disabled}
          type="radio"
          onChange={onChange}
          {...rest}
        />
        <Circle
          checked={checked}
          color={color}
          onClick={!disabled ? onChange : undefined}
        />
        <Label>{value}</Label>
      </Container>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;

const Container = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.43 : 1)};
`;

const HiddenInput = styled.input`
  display: none;
`;

const Circle = styled.div<{
  checked: boolean;
  color: string;
}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${({ checked, color }) =>
    checked
      ? `6px solid ${color}`
      : `2px solid ${theme.colors.lineNormal.normal}`};
  background-color: ${({ checked, color }) =>
    checked ? color : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }
`;

const Label = styled.span`
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: ${theme.colors.label.normal};
`;
