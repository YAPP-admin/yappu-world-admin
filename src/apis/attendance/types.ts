export interface AttendancesRes {
  sessions: AttendanceSession[];
  users: AttendanceUser[];
  attendancesGroupedBySession: AttendanceGroup[];
}

export interface AttendanceSession {
  sessionId: string;
  name: string;
  startDate: string;
  startDayOfWeek: string;
  endDate: string;
  endDayOfWeek: string;
  startTime: string;
  endTime: string;
}

export type UserPositionType =
  | 'PM'
  | 'Design'
  | 'Web'
  | 'Android'
  | 'iOS'
  | 'Flutter'
  | 'Server'
  | '운영진';

export interface AttendanceUser {
  userId: string;
  name: string;
  position: UserPositionType;
}

export interface AttendanceGroup {
  sessionId: string;
  attendances: AttendanceStatus[];
}

export type AttendanceStatusType = '출석' | '지각' | '결석' | '조퇴' | '공결';

export interface AttendanceStatus {
  userId: string;
  status: string;
}
