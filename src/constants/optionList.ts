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
  { label: 'Design', value: 'Design' },
  { label: 'Web', value: 'Web' },
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Server', value: 'Server' },
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
