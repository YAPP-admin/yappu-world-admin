export const getAttendanceStatus = (status: string) => {
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
    default:
      return '';
  }
};
