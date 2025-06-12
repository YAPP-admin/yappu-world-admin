import { AttendanceStatusValueType } from 'apis/attendance/types';

export const getAttendanceStatus = (
  status: string,
): AttendanceStatusValueType => {
  switch (status) {
    case 'ON_TIME':
    case '출석':
      return 'ON_TIME';
    case 'LATE':
    case '지각':
      return 'LATE';
    case 'ABSENT':
    case '결석':
      return 'ABSENT';
    case 'EARLY_CHECK_OUT':
    case '조퇴':
      return 'EARLY_CHECK_OUT';
    case 'EXCUSED_ABSENCE':
    case '공결':
      return 'EXCUSED_ABSENCE';
    case 'PENDING':
    case '미출석':
      return 'PENDING';
    default:
      return 'NULL';
  }
};

export const substitutionAttendee = (status: string | null) => {
  if (!status) return '미참여';
  switch (status) {
    case 'ON_TIME':
      return '출석';
    case 'LATE':
      return '지각';
    case 'ABSENT':
      return '결석';
    case 'EARLY_CHECK_OUT':
      return '조퇴';
    case 'EXCUSED_ABSENCE':
      return '공결';
    default:
      return '';
  }
};
