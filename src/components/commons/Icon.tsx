import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

type IconSize = 'normal' | 'small' | 'custom';
type IconVariant = 'normal' | 'background' | 'outlined' | 'solid';

interface Props {
  icon: React.ReactElement;
  onClick: () => void;
  disabled?: boolean;
  iconSize?: IconSize;
  variant?: IconVariant;
}

const Icon: FC<Props> = (props) => {
  const {
    icon,
    onClick,
    disabled = false,
    iconSize = 'small',
    variant = 'normal',
  } = props;
  return <Container onClick={onClick}>{icon}</Container>;
};

export default Icon;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border-radius: 1000px;
  border: 1px solid ${theme.colors.lineNormal.normal};
  cursor: pointer;
`;
