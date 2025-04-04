import { NoticeCategory } from 'apis/notice/types';

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
