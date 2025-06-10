import { FC } from 'react';
import styled from 'styled-components';

import { EligibleUser, UserPosition } from 'apis/session/types';

import Tab from './Tab';

interface Props {
  tabList: EligibleUser[];
  curTab: string;
  onChangeCurTab: (value: UserPosition) => void;
}

const TabList: FC<Props> = ({ tabList, curTab, onChangeCurTab }) => {
  return (
    <Container>
      {tabList?.map((el) => (
        <Tab
          key={el.position}
          active={el.position === curTab}
          counts={el.users.length}
          title={el.position}
          onChangeCurTab={onChangeCurTab}
        />
      ))}
    </Container>
  );
};

export default TabList;

const Container = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 0 24px;
  border-bottom: 1px solid #e1e2e4;
`;
