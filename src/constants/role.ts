import { RoleLabel, UserRole } from 'apis/user/types';

export const roleList: RoleLabel[] = [
  '관리자',
  '운영진',
  '정회원',
  '수료회원',
  '활동회원',
];

export const userRole: UserRole[] = [
  { label: '관리자', name: 'ADMIN' },
  { label: '운영진', name: 'STAFF' },
  { label: '정회원', name: 'ALUMNI' },
  { label: '수료회원', name: 'GRADUATE' },
  { label: '활동회원', name: 'ACTIVE' },
];
