import { useCallback, useState } from 'react';
import styled from 'styled-components';

import DropDown from '@assets/DropDown';
import useOutsideClick from '@hooks/useOutsideClick';
import theme from 'styles/theme';

import Typography from './Typography';

export interface OptionType {
  label: string;
  value: string;
}

interface Props {
  width?: string;
  optionList: OptionType[];
  selectedValue: string;
  onChange?: (value: string) => void;
  size?: 'medium' | 'large';
}

const Select = ({
  width,
  optionList,
  selectedValue,
  onChange,
  size = 'medium',
}: Props) => {
  const [isClick, setIsClick] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(
    useCallback(() => {
      setIsClick(false);
    }, []),
  );

  const openOptionList = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <Container ref={containerRef} width={width}>
      <SelectButton size={size} type="button" onClick={openOptionList}>
        <Typography
          style={{ whiteSpace: 'nowrap' }}
          variant={size === 'medium' ? 'body2Reading' : 'body1Normal'}
        >
          {optionList.find((option) => option.value === selectedValue)?.label ??
            '선택하세요'}
        </Typography>
        <IconWrapper $isOpen={isClick}>
          <DropDown size={size === 'medium' ? '20' : '24'} />
        </IconWrapper>
      </SelectButton>
      {isClick && (
        <OptionWrapper>
          {optionList.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange?.(option.value);
                setIsClick(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </OptionWrapper>
      )}
    </Container>
  );
};

export default Select;

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  position: relative;
`;

const SelectButton = styled.button<{ size: 'medium' | 'large' }>`
  display: flex;
  padding: ${({ size }) => (size === 'medium' ? '12px' : '12px 16px')};
  height: ${({ size }) => (size === 'medium' ? '40px' : '48px')};
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${theme.colors.lineNormal.strong};
  background: #fff;
  box-sizing: border-box;
  width: 100%;
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : '')};
`;

const OptionWrapper = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  border: 1px solid ${theme.colors.lineNormal.strong};
  box-shadow: ${theme.boxShadow.normal};
  width: 100%;
  border-radius: 12px;
  z-index: 1;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;

  li {
    list-style: none;
    padding: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.091px;
    border-radius: 8px;
    cursor: pointer;
  }

  li:hover {
    background: ${theme.colors.fill.normal};
  }
`;
