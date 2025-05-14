import {
  AttendanceSession,
  AttendanceStatusValueType,
  AttendanceUser,
} from 'apis/attendance/types';
import AttandanceTable from 'features/attendance/AttendanceTable';
import SummaryTable from 'features/attendance/SummaryTable';
import { FC } from 'react';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusValueType | null>>
    | undefined;
}

const AttendanceDetail: FC<Props> = ({ sessionMap, sessions, users }) => {
  return (
    <>
      <AttandanceTable
        sessionMap={sessionMap}
        sessions={sessions}
        users={users}
      />
      <SummaryTable sessions={sessions} users={users} />
    </>
  );
};

export default AttendanceDetail;
