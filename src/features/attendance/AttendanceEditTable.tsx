import { FC } from 'react';

import Select from '@compnents/commons/Select';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableRow from '@compnents/table/TableRow';
import { attendanceOptions } from '@constants/optionList';
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

const AttendanceEditTable: FC<Props> = ({ sessionMap, sessions, users }) => {
  return (
    <Table>
      <AttendanceHeader sessions={sessions} />
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="sticky-col-1 ">
              <Typography variant="body1Normal">{user.name}</Typography>
            </TableCell>
            <TableCell className="sticky-col-2 ">
              <Typography variant="body1Normal">{user.totalPoint}</Typography>
            </TableCell>
            {sessions?.map((session) => {
              if (!sessionMap)
                return <TableCell key={session.sessionId}>-</TableCell>;
              const status = sessionMap[session.sessionId]?.[user.userId] ?? '';
              return (
                <TableCell key={session.sessionId} max>
                  <Select
                    optionList={attendanceOptions}
                    selectedValue={status}
                  />
                </TableCell>
              );
            })}
            <TableCell max>
              <Typography variant="body1Normal">{user.lateCount}</Typography>
            </TableCell>
            <TableCell max>
              <Typography variant="body1Normal">
                {user.earlyCheckOutCount}
              </Typography>
            </TableCell>
            <TableCell max>
              <Typography variant="body1Normal">
                {user.latePassCount}
              </Typography>
            </TableCell>
            <TableCell max>
              <Typography variant="body1Normal">{user.absentCount}</Typography>
            </TableCell>
            <TableCell max>
              <Typography variant="body1Normal">{user.penaltyPoint}</Typography>
            </TableCell>
            <TableCell max>
              <Typography variant="body1Normal">{user.bonusPoint}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceEditTable;
