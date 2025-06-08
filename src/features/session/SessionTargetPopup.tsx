import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { UserInfo } from 'apis/notice/types';
import { EligibleUser, UserPosition } from 'apis/session/types';

import TabList from './TabList';
import TargetUserList from './TargetUserList';

interface Props {
  onClose: () => void;
  onConfirm: (updated: Record<UserPosition, Set<string>>) => void;
  eligibleUsers: EligibleUser[];
  defaultSelectedUsers: Record<UserPosition, Set<string>>;
}

const SessionTargetPopup: FC<Props> = ({
  onClose,
  eligibleUsers,
  onConfirm,
  defaultSelectedUsers,
}) => {
  const [curTab, setCurTab] = useState<UserPosition>('PM');
  const [selectedMap, setSelectedMap] = useState(defaultSelectedUsers);

  const handleConfirm = () => {
    onConfirm(selectedMap);
  };

  const onChangeCurTab = (value: UserPosition) => {
    setCurTab(value);
  };

  const eligibleUserMap = useMemo(() => {
    return {
      PM: [],
      DESIGN: [],
      WEB: [],
      ANDROID: [],
      IOS: [],
      FLUTTER: [],
      SERVER: [],
      STAFF: [],
      ...Object.fromEntries(eligibleUsers.map((el) => [el.position, el.users])),
    } as Record<UserPosition, UserInfo[]>;
  }, [eligibleUsers]);

  const handleToggleUser = (userId: string) => {
    setSelectedMap((prev) => {
      const newSet = new Set(prev[curTab]);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return { ...prev, [curTab]: newSet };
    });
  };

  const handleToggleAll = () => {
    const users = eligibleUserMap[curTab] ?? [];
    const selectedSet = selectedMap[curTab] ?? new Set();
    const allSelected = selectedSet.size === users.length;

    setSelectedMap((prev) => ({
      ...prev,
      [curTab]: new Set(allSelected ? [] : users.map((u) => u.userId)),
    }));
  };

  const totalSelectedCount = Object.values(selectedMap).reduce(
    (acc, set) => acc + set.size,
    0,
  );

  return (
    <PopupContainer onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FlexBox justify="space-between" padding="24px">
          <Typography variant="headline1Bold">세션 대상 선택</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </FlexBox>

        <Content>
          <TabList
            curTab={curTab}
            tabList={eligibleUsers}
            onChangeCurTab={onChangeCurTab}
          />
          <TargetUserList
            selectedIds={selectedMap[curTab]}
            users={eligibleUserMap[curTab]}
            onToggleAll={handleToggleAll}
            onToggleUser={handleToggleUser}
          />
        </Content>

        <ButtonWrapper>
          <SolidButton size="xlarge" onClick={handleConfirm}>
            {totalSelectedCount}명 선택 완료
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default SessionTargetPopup;

const Container = styled.div`
  display: flex;
  width: 586px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  background: #fff;

  div {
    box-sizing: border-box;
  }
`;

const ButtonWrapper = styled.div`
  padding: 24px;
  button {
    width: 100%;
  }
`;

const Content = styled.div``;
