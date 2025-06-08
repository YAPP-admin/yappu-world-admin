import { FC } from 'react';
import styled from 'styled-components';

import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import { UserInfo } from 'apis/notice/types';

interface Props {
  users: UserInfo[];
  selectedIds: Set<string>;
  onToggleUser: (userId: string) => void;
  onToggleAll: () => void;
}

const TargetUserList: FC<Props> = ({
  users,
  selectedIds,
  onToggleAll,
  onToggleUser,
}) => {
  const allSelected = users?.length > 0 && selectedIds?.size === users?.length;

  return (
    <Container>
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
        {users?.map((user) => (
          <FlexBox key={user.userId} align="center" gap={8}>
            <Checkbox
              state={selectedIds?.has(user.userId) ? 'checked' : 'unchecked'}
              onChange={() => onToggleUser(user.userId)}
            />
            <Typography variant="body2Normal">{user.name}</Typography>
          </FlexBox>
        ))}
      </GridBox>
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
