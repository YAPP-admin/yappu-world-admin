import Select from '@compnents/commons/Select';
import { attendanceOptions } from '@constants/optionList';
import { useAttendanceStore } from '@stores/attendanceStore';
import { getAttendanceStatus } from '@utils/getAttendanceStatus';
import { FC } from 'react';

import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableRow from '@compnents/table/TableRow';
import {
  AttendanceSession,
  AttendanceStatusValueType,
  AttendanceUser,
} from 'apis/attendance/types';

import AttendanceHeader from './AttendanceHeader';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusValueType | null>>
    | undefined;
}

const AttendanceEditTable: FC<Props> = ({ sessionMap, sessions, users }) => {
  const { editedMap, updateStatus } = useAttendanceStore();

  return (
    <Table>
      <AttendanceHeader sessions={sessions} />
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="sticky-col-1 ">
              <Typography variant="body1Normal">{user.name}</Typography>
            </TableCell>
            <TableCell className="sticky-col-2 ">
              <Typography variant="body1Normal">{user.totalPoint}</Typography>
            </TableCell>
            {sessions?.map((session) => {
              if (!sessionMap)
                return <TableCell key={session.sessionId}>-</TableCell>;
              const status =
                editedMap[session.sessionId]?.[user.userId] ??
                sessionMap[session.sessionId]?.[user.userId] ??
                '';
              return (
                <TableCell key={session.sessionId} max>
                  <Select
                    optionList={attendanceOptions}
                    selectedValue={getAttendanceStatus(status)}
                    onChange={(value) => {
                      updateStatus(session.sessionId, user.userId, value);
                    }}
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
