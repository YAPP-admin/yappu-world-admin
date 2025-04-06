import { NoticeCategory } from 'apis/notice/types';
import { ActivityUnit } from 'apis/user/types';

export interface LoginType {
  email: string;
  password: string;
}

export interface UserRoleType {
  name: string;
  code: string;
}

export interface BaseNoticeType {
  type: NoticeCategory;
  title: string;
  content: string;
  plainContent: string;
}

export interface EditNoticeType extends BaseNoticeType {
  id: string;
}

export interface OperationListType {
  id: string;
  name: string;
  link: string;
}

export interface EditGenerationType {
  generation: number;
  targetActive: boolean;
}

export interface AddGenerationType {
  generation: number;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
}

export interface UserDetailType {
  id: string;
  name: string;
  email: string;
  activityUnits: ActivityUnit[];
}
