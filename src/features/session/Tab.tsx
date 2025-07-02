import { FC } from 'react';
import styled from 'styled-components';

import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import { UserPosition } from 'apis/session/types';

interface Props {
  onChangeCurTab: (value: UserPosition) => void;
  title: UserPosition;
  active: boolean;
  counts?: number;
}

const Tab: FC<Props> = ({ onChangeCurTab, title, active, counts = 0 }) => {
  return (
    <Container active={active} onClick={() => onChangeCurTab(title)}>
      <Typography
        color={active ? 'primary-normal' : 'label-alternative'}
        variant="label1Normal"
      >
        {title}
      </Typography>
      <Chip
        color={active ? 'primary' : 'coolNeutral'}
        size="small"
        text={counts.toString()}
        variant="weak"
      />
    </Container>
  );
};

export default Tab;

const Container = styled.div<{ active: boolean }>`
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-bottom: ${({ active }) => (active ? '1px solid #FA6027' : '')};
  cursor: pointer;

  span {
    font-weight: 600;
  }
`;
