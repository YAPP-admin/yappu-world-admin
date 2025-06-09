import { FC } from 'react';
import styled from 'styled-components';

import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import { UserInfo } from 'apis/notice/types';

interface Props {
  users: UserInfo[];
  selectedUsers: UserInfo[];
  onToggleUser: (userId: UserInfo) => void;
  onToggleAll: () => void;
}

const TargetUserList: FC<Props> = ({
  users,
  selectedUsers,
  onToggleAll,
  onToggleUser,
}) => {
  const allSelected =
    users?.length > 0 && selectedUsers?.length === users?.length;

  return (
    <Container>
      {users.length ? (
        <>
          <FlexBox align="center" gap={8}>
            <Checkbox
              state={allSelected ? 'checked' : 'unchecked'}
              onChange={onToggleAll}
            />
            <Typography fontWeight={600} variant="body2Normal">
              전체 선택
            </Typography>
          </FlexBox>
          <GridBox columns={2} rowGap={16}>
            {users.map((user) => {
              const isSelected = selectedUsers.some(
                (u) => u.userId === user.userId,
              );
              return (
                <FlexBox key={user.userId} align="center" gap={8}>
                  <Checkbox
                    state={isSelected ? 'checked' : 'unchecked'}
                    onChange={() => onToggleUser(user)}
                  />
                  <Typography variant="body2Normal">{user.name}</Typography>
                </FlexBox>
              );
            })}
          </GridBox>
        </>
      ) : (
        <Typography variant="body1Normal">
          선택 가능한 대상이 없습니다.
        </Typography>
      )}
    </Container>
  );
};

export default TargetUserList;

const Container = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 16px;
`;
