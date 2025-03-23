import DropDown from '@assets/DropDown';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Typography from './Typography';

interface Props<T> {
  width?: string;
  optionList: T[];
  selectedValue: T;
  onChange: (value: T) => void;
  getLabel?: (option: T) => string;
}

const Select = <T,>({
  width,
  optionList,
  selectedValue,
  onChange,
  getLabel,
}: Props<T>) => {
  const [isClick, setIsClick] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const openOptionList = () => {
    setIsClick((prev) => !prev);
  };

  useEffect(() => {
    function handleInteraction(e: MouseEvent) {
      if (selectRef?.current && !selectRef.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    }

    document.addEventListener('mousedown', handleInteraction);
    return () => {
      document.removeEventListener('mousedown', handleInteraction);
    };
  }, []);

  return (
    <Container width={width} ref={selectRef}>
      <SelectButton type="button" onClick={openOptionList}>
        <Typography
          children={
            getLabel ? getLabel(selectedValue) : (selectedValue as string)
          }
          variant="body1Normal"
        />
        <DropDown />
      </SelectButton>
      {isClick && (
        <OptionWrapper>
          {optionList.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option);
                setIsClick(false);
              }}
            >
              {getLabel ? getLabel(option) : (option as string)}
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
const SelectButton = styled.button`
  display: flex;
  height: 40px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${theme.colors.lineNormal.strong};
  background: #fff;
  box-sizing: border-box;
  width: 100%;
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
  }
`;
