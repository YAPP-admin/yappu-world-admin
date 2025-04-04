import { RoleLabel, RoleName } from 'apis/user/types';

export interface LoginType {
  email: string;
  password: string;
}

export interface UserRoleType {
  name: string;
  code: string;
}
