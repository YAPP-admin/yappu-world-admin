export interface UserListRes {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  lastActivityUnit: ActivityUnit;
}

export interface UserRole {
  name: string;
  label: string;
}

export interface ActivityUnit {
  generation: number;
  position: string;
}

export interface UserList {
  userId: string;
  name: string;
  generation: number;
  position: string;
  role: string;
  date: string;
  isExit: string;
}

export interface UserDetailRes {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  activityUnits: ActivityUnit[];
}
