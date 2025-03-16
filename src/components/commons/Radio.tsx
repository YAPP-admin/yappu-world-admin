import { forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface RadioProps {
  label: string;
  color?: string;
  onChange?: () => void;
  value?: string;
  checked?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, color = '#E56738', onChange, checked, value }, ref) => {
    return (
      <Container>
        <HiddenInput
          type="radio"
          ref={ref}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <Circle isChecked={checked || false} color={color} onClick={onChange} />
        <Label>{label}</Label>
      </Container>
    );
  },
);

export default Radio;

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Circle = styled.div<{ isChecked: boolean; color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${({ isChecked, color }) =>
    isChecked
      ? `6px solid ${color}`
      : `2px solid ${theme.colors.lineNormal.normal}`};
  background-color: ${({ isChecked, color }) =>
    isChecked ? color : 'transparent'};
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
    display: ${({ isChecked }) => (isChecked ? 'block' : 'none')};
  }
`;

const Label = styled.span`
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: ${theme.colors.label.normal};
`;
