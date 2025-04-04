import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';

import {
  BaseNoticeReq,
  DeleteNoticeReq,
  EditNoticeReq,
  NoticeDetailRes,
  NoticeRes,
  NoticeType,
} from './types';

export const getAllNotice = (
  page: number,
  size: number,
  noticeType: NoticeType,
) => {
  return axiosInstance.get<PaginatedApiResponse<NoticeRes>>(
    `/admin/v1/notices?page=${page}&size=${size}&noticeType=${noticeType}`,
  );
};

export const postNewNotice = (data: BaseNoticeReq): Promise<void> => {
  return axiosInstance.post('/admin/v1/notices', data);
};

export const getNoticeDetail = (noticeId: string) => {
  return axiosInstance.get<ApiResponse<NoticeDetailRes>>(
    `/admin/v1/notices/${noticeId}`,
  );
};

export const putNotice = (data: EditNoticeReq): Promise<void> => {
  return axiosInstance.put('/admin/v1/notices', data);
};

export const deleteNotice = (data: DeleteNoticeReq): Promise<void> => {
  return axiosInstance.delete('/admin/v1/notices', { data });
};
