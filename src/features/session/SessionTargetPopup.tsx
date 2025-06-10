import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { SelectedUsersMap } from '@pages/admin/sessions/SessionWrite';
import { UserInfo } from 'apis/notice/types';
import { EligibleUser, UserPosition } from 'apis/session/types';

import TabList from './TabList';
import TargetUserList from './TargetUserList';

interface Props {
  onClose: () => void;
  onConfirm: (updated: SelectedUsersMap) => void;
  eligibleUsers: EligibleUser[];
  defaultSelectedUsers: SelectedUsersMap;
}

const SessionTargetPopup: FC<Props> = ({
  onClose,
  eligibleUsers,
  onConfirm,
  defaultSelectedUsers,
}) => {
  const [curTab, setCurTab] = useState<UserPosition>('PM');
  const [selectedMap, setSelectedMap] =
    useState<SelectedUsersMap>(defaultSelectedUsers);

  const handleConfirm = () => {
    onConfirm(selectedMap);
  };

  const onChangeCurTab = (value: UserPosition) => {
    setCurTab(value);
  };

  const eligibleUserMap = useMemo(() => {
    const base: Record<UserPosition, UserInfo[]> = {
      PM: [],
      DESIGN: [],
      WEB: [],
      ANDROID: [],
      IOS: [],
      FLUTTER: [],
      SERVER: [],
    };

    eligibleUsers.forEach(({ position, users }) => {
      base[position] = users;
    });

    return base;
  }, [eligibleUsers]);

  const handleToggleUser = (user: UserInfo) => {
    setSelectedMap((prev) => {
      const current = prev[curTab] ?? [];
      const exists = current.some((u) => u.userId === user.userId);

      const updated = exists
        ? current.filter((u) => u.userId !== user.userId)
        : [...current, user];

      return { ...prev, [curTab]: updated };
    });
  };

  const handleToggleAll = () => {
    const users = eligibleUserMap[curTab] ?? [];
    const current = selectedMap[curTab] ?? [];
    const allSelected = current.length === users.length;

    setSelectedMap((prev) => ({
      ...prev,
      [curTab]: allSelected ? [] : users,
    }));
  };

  const totalSelectedCount = Object.values(selectedMap).reduce(
    (acc, list) => acc + list.length,
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
            selectedUsers={selectedMap[curTab]}
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
  min-height: 50%;

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

const Content = styled.div`
  flex: 1;
`;
