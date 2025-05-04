import { NoticeCategory } from 'apis/notice/types';
import { PlatformReqType } from 'apis/operation/types';
import { ScheduleType, SessionType } from 'apis/session/types';
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
  phoneNumber: string;
  gender: string;
}

export interface EditSessionType {
  id: string;
  name: string;
  place: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  generation: number;
  sessionType: SessionType;
}

export interface AddSessionType {
  name: string;
  place: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  generation: number;
  type: ScheduleType; // 항상 SESSION
  sessionType: SessionType;
}

export interface SupportVersionType {
  platform: PlatformReqType;
  version: string;
}
