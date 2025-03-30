import { FC } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';

interface Props {
  checked: boolean;
  disabled: boolean;
  size?: 'small' | 'medium';
  onToggle?: () => void;
}

const Switch: FC<Props> = ({ checked, disabled, size = 'small', onToggle }) => {
  return (
    <SwitchContainer onClick={onToggle}>
      <ThumbWrapper $checked={checked} $disabled={disabled} $size={size}>
        <Thumb $size={size} $checked={checked} />
      </ThumbWrapper>
    </SwitchContainer>
  );
};

export default Switch;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ThumbWrapper = styled.div<{
  $checked: boolean;
  $disabled: boolean;
  $size: 'small' | 'medium';
}>`
  height: fit-content;
  display: flex;
  align-items: center;
  position: relative;
  ${({ $size }) =>
    $size === 'medium'
      ? css`
          width: 52px;
          padding: 4px;
          border-radius: 100px;
        `
      : css`
          width: 39px;
          padding: 3px;
          border-radius: 75px;
        `}
  background: ${({ $checked }) =>
    $checked
      ? `${theme.colors.primary.normal}`
      : `${theme.colors.fill.strong}`};
  opacity: ${({ $disabled }) => ($disabled ? 0.43 : 1)};
  transition: all 0.3s;
`;

const Thumb = styled.div<{
  $size: 'small' | 'medium';
  $checked: boolean;
}>`
  background: #fff;
  transition: transform 0.3s ease;
  transform: ${({ $checked }) =>
    $checked ? `translateX(20px)` : `translateX(0px)`};

  ${({ $size }) =>
    $size === 'medium'
      ? css`
          width: 24px;
          height: 24px;
          border-radius: 1000px;
        `
      : css`
          width: 18px;
          height: 18px;
          border-radius: 750px;
        `}
`;
