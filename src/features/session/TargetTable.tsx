import { FC } from 'react';
import styled from 'styled-components';

import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import { SelectedUsersMap } from '@pages/admin/sessions/SessionWrite';
import { SessionAttendees, UserPosition } from 'apis/session/types';

interface Props {
  sessionAttendees?: SessionAttendees[];
}

const TargetTable: FC<Props> = ({ sessionAttendees }) => {
  const data: SelectedUsersMap = {
    PM: [],
    DESIGN: [],
    WEB: [],
    ANDROID: [],
    IOS: [],
    FLUTTER: [],
    SERVER: [],
  };

  sessionAttendees?.forEach(({ position, attendees }) => {
    data[position as UserPosition] = attendees.map(({ userId, name }) => ({
      userId,
      name,
    }));
  });

  return (
    <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {Object.entries(data).map(([position, users]) => (
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
                  <Typography
                    key={user.userId}
                    color="label-alternative"
                    fontWeight={600}
                    variant="label1Normal"
                  >
                    {user.name}
                  </Typography>
                ))}
              </UserWrapper>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TargetTable;

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
