import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import ShapeIcon from '@assets/Shpae';

type CheckboxSize = 'normal' | 'small';
type CheckboxState = 'unchecked' | 'checked' | 'partial';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checkboxSize?: CheckboxSize;
  state?: CheckboxState;
  disabled?: boolean;
}

const Checkbox: FC<Props> = (props) => {
  const {
    checkboxSize = 'normal',
    state = 'unchecked',
    disabled = false,
    ...rest
  } = props;

  return (
    <Wrapper $checkboxSize={checkboxSize} $state={state} $disabled={disabled}>
      <HiddenInput type="checkbox" disabled={disabled} {...rest} />
      <StyledCheckbox
        $checkboxSize={checkboxSize}
        $state={state}
        $disabled={disabled}
      >
        {state === 'checked' && <ShapeIcon />}
      </StyledCheckbox>
    </Wrapper>
  );
};

export default Checkbox;

const Wrapper = styled.label<{
  $checkboxSize: CheckboxSize;
  $state: CheckboxState;
  $disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ $disabled }) => ($disabled ? 0.43 : 1)};
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div<{
  $checkboxSize: CheckboxSize;
  $state: CheckboxState;
  $disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ $checkboxSize }) =>
    $checkboxSize === 'normal' ? '18px' : '16px'};
  height: ${({ $checkboxSize }) =>
    $checkboxSize === 'normal' ? '18px' : '16px'};
  border-radius: 3px;
  flex-shrink: 0;

  border: 1.5px solid
    ${({ $state, $disabled }) =>
      $state === 'checked'
        ? theme.colors.primary.normal
        : theme.colors.lineNormal.normal};

  background-color: ${({ $state }) =>
    $state === 'checked'
      ? theme.colors.primary.normal
      : theme.colors.backgroundNormal.normal};
`;
