import { FC } from 'react';

import {
  AttendanceSession,
  AttendanceStatusType,
  AttendanceUser,
} from 'apis/attendance/types';
import AttandanceTable from 'features/attendance/AttendanceTable';
import SummaryTable from 'features/attendance/SummaryTable';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusType | null>>
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
