export type NoticeCategory = 'SESSION' | 'OPERATION';
export type NoticeType = 'ALL' | NoticeCategory;

export interface WriterInfo {
  userId: string;
  name: string;
}

export interface WriterInfoDetail {
  id: string;
  name: string;
}

export interface NoticeRes {
  noticeId: string;
  title: string;
  createdAt: string;
  writer: WriterInfo;
  noticeType: string;
}

export interface NoticeDetailRes {
  noticeId: string;
  title: string;
  createdAt: string;
  writer: WriterInfoDetail;
  content: string;
  type: NoticeCategory;
}

export interface BaseNoticeReq {
  type: NoticeCategory;
  title: string;
  content: string;
  plainContent: string;
}

export interface NoticeReq {
  type: NoticeCategory;
  title: string;
  content: string;
  plainContent: string;
}

export interface EditNoticeReq extends BaseNoticeReq {
  id: string;
}

export interface DeleteNoticeReq {
  noticeIds: string[];
}
