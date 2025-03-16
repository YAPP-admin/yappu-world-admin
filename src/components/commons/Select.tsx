import DropDown from '@assets/DropDown';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Typography from './Typography';

const option: { label: string; value: string }[] = [
  { label: '활동회원', value: '활동회원' },
  { label: '정회원', value: '정회원' },
  { label: '수료자', value: '수료자' },
  { label: '운영진', value: '운영진' },
];

interface Props {
  width?: string;
  optionList?: string[];
}

const Select: FC<Props> = (props) => {
  const { width, optionList } = props;
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
        <Typography text="활동회원" variatnt="body1Normal" />
        <DropDown />
      </SelectButton>
      {isClick && (
        <OptionWrapper>
          {option?.map((el) => <li key={el.value}>{el.label}</li>)}
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
