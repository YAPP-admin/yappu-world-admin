import { FC } from 'react';

import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableRow from '@compnents/table/TableRow';
import { getChipColor } from '@utils/getChipColor';
import {
  AttendanceSession,
  AttendanceStatusType,
  AttendanceUser,
} from 'apis/attendance/types';

import AttendanceHeader from './AttendanceHeader';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusType | null>>
    | undefined;
}

const AttandanceTable: FC<Props> = ({ sessions, users, sessionMap }) => {
  return (
    <Table>
      <AttendanceHeader sessions={sessions} />
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="sticky-col-1 " widthType="fixed">
              <Typography variant="body1Normal">{user.name}</Typography>
            </TableCell>
            <TableCell className="sticky-col-2 " widthType="fixed">
              <Typography variant="body1Normal">{user.totalPoint}</Typography>
            </TableCell>
            {sessions?.map((session) => {
              if (!sessionMap) return <td key={session.sessionId}>-</td>;
              const status = sessionMap[session.sessionId]?.[user.userId] ?? '';
              return (
                <TableCell key={session.sessionId} widthType="max">
                  <Chip
                    color={getChipColor(status).color}
                    size="large"
                    text={status}
                    variant={getChipColor(status).variant}
                  />
                </TableCell>
              );
            })}
            <TableCell widthType="max">
              <Typography variant="body1Normal">{user.lateCount}</Typography>
            </TableCell>
            <TableCell widthType="max">
              <Typography variant="body1Normal">
                {user.earlyCheckOutCount}
              </Typography>
            </TableCell>
            <TableCell widthType="max">
              <Typography variant="body1Normal">
                {user.latePassCount}
              </Typography>
            </TableCell>
            <TableCell widthType="max">
              <Typography variant="body1Normal">{user.absentCount}</Typography>
            </TableCell>
            <TableCell widthType="max">
              <Typography variant="body1Normal">{user.penaltyPoint}</Typography>
            </TableCell>
            <TableCell widthType="max">
              <Typography variant="body1Normal">{user.bonusPoint}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttandanceTable;
