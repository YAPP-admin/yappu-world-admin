import { FC } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import TextButton from '@compnents/Button/TextButton';
import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import { SelectedUsersMap } from '@pages/admin/sessions/SessionWrite';
import { UserPosition } from 'apis/session/types';

interface Props {
  selectedUsers: SelectedUsersMap;
  onRemove: (position: UserPosition, userId: string) => void;
}

const SelectedTargetUserTable: FC<Props> = ({ selectedUsers, onRemove }) => {
  return (
    <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {Object.entries(selectedUsers).map(([position, users]) => (
          <tr key={position}>
            <td className="position">
              <TablePosition>
                <Typography fontWeight={600} variant="body1Normal">
                  {position}
                </Typography>
                <Chip
                  color="neutral"
                  size="small"
                  text={users.length.toString()}
                  variant="weak"
                />
              </TablePosition>
            </td>
            <td>
              <UserWrapper>
                {users.map((user) => (
                  <TextButton
                    key={user.userId}
                    rightIcon={
                      <Close
                        color="rgba(55, 56, 60, 0.61)"
                        height="16"
                        width="16"
                      />
                    }
                    onClick={() =>
                      onRemove(position as UserPosition, user.userId)
                    }
                  >
                    <Typography
                      color="label-alternative"
                      fontWeight={600}
                      variant="label1Normal"
                    >
                      {user.name}
                    </Typography>
                  </TextButton>
                ))}
              </UserWrapper>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SelectedTargetUserTable;

const Table = styled.table`
  border-top: 1px solid #aeb0b6;

  tr {
    border-bottom: 1px solid #e1e2e4;
  }

  td {
    padding: 0;
  }
  .position {
    width: 160px;
    background: rgba(112, 115, 124, 0.08);
  }
`;

const TablePosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  width: 160px;
  border-right: 1px solid #e1e2e4;
  height: 100%;
  box-sizing: border-box;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
  padding: 2px;
`;
