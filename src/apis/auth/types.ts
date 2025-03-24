import { RoleName, UserRole } from 'apis/user/types';

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface MemberCodeRes {
  code: string;
  role: UserRole;
}

export interface MemberCodeReq {
  role: RoleName;
  code: string;
}
