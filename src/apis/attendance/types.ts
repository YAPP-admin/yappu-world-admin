export interface AttendancesRes {
  sessions: AttendanceSession[];
  users: AttendanceUser[];
  attendancesGroupedBySession: AttendanceGroup[];
}

export interface AttendanceSession {
  sessionId: string;
  name: string; // 세명
  startDate: string;
  startDayOfWeek: string;
  endDate: string;
  endDayOfWeek: string;
  startTime: string;
  endTime: string;
  totalPersonCount: number; // 총인원
  totalOnTimeCount: number; // 출석 인원
  totalLateCount: number; // 지각 인원
  totalAbsentCount: number; // 결석 인원
  totalEarlyCheckOutCount: number; // 조퇴 인원
  totalExcusedAbsenceCount: number; // 공결 인원
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
  name: string; // 유저명
  position: UserPositionType;
  onTimeCount: number; // 출석 횟수
  lateCount: number; // 지각 횟수
  absentCount: number; // 결석 횟수
  earlyCheckOutCount: number; // 조회 횟수
  excusedAbsenceCount: number; // 공결 횟수
  latePassCount: number; // 지각 면제권 개수
  totalPoint: number; // 총점
  penaltyPoint: number; // 감점
  bonusPoint: number; // 가점
}

export interface AttendanceGroup {
  sessionId: string;
  attendances: AttendanceStatus[];
}

export type AttendanceStatusType = '출석' | '지각' | '결석' | '조퇴' | '공결';
export type AttendanceStatusValueType =
  | 'ON_TIME'
  | 'LATE'
  | 'ABSENT'
  | 'EARLY_CHECK_OUT'
  | 'EXCUSED_ABSENCE';

export interface AttendanceStatus {
  userId: string;
  status: AttendanceStatusType | null;
}

export interface EditAttendanceReq {
  targets: EditAttendanceTarget[];
}

export interface EditAttendanceTarget {
  userId: string;
  sessionId: string;
  attendanceStatus: AttendanceStatusValueType;
}
