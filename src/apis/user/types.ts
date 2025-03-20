export interface UserListRes {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  lastActivityUnit: LastActivityUnit;
}

export interface UserRole {
  name: string;
  label: string;
}

export interface LastActivityUnit {
  generation: number;
  position: string;
}
