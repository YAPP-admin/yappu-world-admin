import { OptionType } from '@compnents/commons/Select';

export const userRoleOptionList = [
  { label: '관리자', value: 'ADMIN' },
  { label: '운영진', value: 'STAFF' },
  { label: '정회원', value: 'ALUMNI' },
  { label: '수료회원', value: 'GRADUATE' },
  { label: '활동회원', value: 'ACTIVE' },
];

export const noticeOptionList = [
  { label: '운영', value: 'OPERATION' },
  { label: '세션', value: 'SESSION' },
];

export const positionOptionList = [
  { label: 'PM', value: 'PM' },
  { label: 'Design', value: 'DESIGN' },
  { label: 'Web', value: 'WEB' },
  { label: 'Android', value: 'ANDROID' },
  { label: 'iOS', value: 'IOS' },
  { label: 'Flutter', value: 'FLUTTER' },
  { label: 'Server', value: 'SERVER' },
  { label: '운영진', value: '운영진' },
];

export const rejectOptionList = [{ label: '직접입력', value: '직접입력' }];

export const sessionTypeList = [
  { label: '오프라인', value: 'OFFLINE' },
  { label: '온라인', value: 'ONLINE' },
  { label: '팀', value: 'TEAM' },
];

export const hourOptions: OptionType[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return {
    label: `${hour}시`,
    value: hour,
  };
});

export const minuteOptions: OptionType[] = Array.from({ length: 6 }, (_, i) => {
  const minute = (i * 10).toString().padStart(2, '0');
  return {
    label: `${minute}분`,
    value: minute,
  };
});

export const attendanceOptions = [
  { label: '출석', value: 'ON_TIME' },
  { label: '지각', value: 'LATE' },
  { label: '결석', value: 'ABSENT' },
  { label: '조퇴', value: 'EARLY_CHECK_OUT' },
  { label: '공결', value: 'EXCUSED_ABSENCE' },
  { label: '미출석', value: 'PENDING' },
  { label: '미참여', value: 'NULL' },
];

export const positionList = [
  'PM',
  'Design',
  'Web',
  'Android',
  'iOS',
  'Flutter',
  'Server',
  'Staff',
];
