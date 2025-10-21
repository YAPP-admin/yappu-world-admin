import { FC } from 'react';

import Select from '@compnents/commons/Select';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableRow from '@compnents/table/TableRow';
import { attendanceOptions, latePassOptions } from '@constants/optionList';
import { useAttendanceStore } from '@stores/attendanceStore';
import { getAttendanceStatus } from '@utils/getAttendanceStatus';
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
  const { editedMap, updateStatus, latePassMap, updateLatePass } =
    useAttendanceStore();

  return (
    <Table>
      <AttendanceHeader sessions={sessions} />
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="sticky-col-1" widthType="fixed">
              <Typography variant="body1Normal">{user.name}</Typography>
            </TableCell>
            <TableCell className="sticky-col-2" widthType="fixed">
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
                <TableCell key={session.sessionId} widthType="max">
                  <Select
                    defaultSelectLabel="-"
                    disabled={!status}
                    optionList={attendanceOptions}
                    selectedValue={getAttendanceStatus(status)}
                    onChange={(value) => {
                      if (getAttendanceStatus(status) === 'NULL') return;
                      updateStatus(session.sessionId, user.userId, value);
                    }}
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
              <Select
                optionList={latePassOptions}
                defaultSelectLabel={
                  latePassOptions.find(
                    (el) => el.value === user.latePassCount.toString(),
                  )?.label
                }
                selectedValue={
                  latePassMap[user.userId]?.toString() ??
                  user.latePassCount.toString()
                }
                onChange={(value) => {
                  updateLatePass(user.userId, Number(value));
                }}
              />
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

export default AttendanceEditTable;
