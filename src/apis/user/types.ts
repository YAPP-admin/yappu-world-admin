export interface UserListRes {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  registrationDate: string;
  lastActivityUnit: ActivityUnit;
}

export interface UserRole {
  name: RoleName;
  label: RoleLabel;
}

export type RoleName =
  | 'ADMIN'
  | 'STAFF'
  | 'ALUMNI'
  | 'GRADUATE'
  | 'ACTIVE'
  | '';

export type RoleLabel =
  | '관리자'
  | '운영진'
  | '정회원'
  | '수료회원'
  | '활동회원'
  | '';

export interface ActivityUnit {
  id?: string;
  generation: number;
  position: string;
  isActive?: boolean;
}

export interface UserList {
  userId: string;
  name: string;
  generation: number;
  position: string;
  role: UserRole;
  registrationDate: string;
  isActive: string;
}

export type UserGender = '남' | '여';

export interface UserDetailRes {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: UserGender;
  role: RoleLabel;
  isActive: boolean;
  activityUnits: ActivityUnit[];
  joinDate: string;
}

export interface UserDetailReq {
  id: string;
  name: string;
  email: string;
  activityUnits: ActivityUnit[];
}
