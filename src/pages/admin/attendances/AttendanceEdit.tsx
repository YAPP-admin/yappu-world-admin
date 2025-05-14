import {
  AttendanceSession,
  AttendanceStatusValueType,
  AttendanceUser,
} from 'apis/attendance/types';
import AttendanceEditTable from 'features/attendance/AttendanceEditTable';
import SummaryTable from 'features/attendance/SummaryTable';
import { FC } from 'react';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusValueType | null>>
    | undefined;
}

const AttendaceEdit: FC<Props> = ({ sessionMap, sessions, users }) => {
  return (
    <>
      <AttendanceEditTable
        sessionMap={sessionMap}
        sessions={sessions}
        users={users}
      />
      <SummaryTable sessions={sessions} users={users} />
    </>
  );
};

export default AttendaceEdit;
