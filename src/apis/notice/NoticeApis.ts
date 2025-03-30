import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';
import {
  BaseNoticeReq,
  EditNoticeReq,
  NoticeDetailRes,
  NoticeRes,
  NoticeType,
} from './types';

const sampleAllNotice: PaginatedApiResponse<NoticeRes> = {
  data: {
    data: [
      {
        noticeId: '1',
        title: '공지 타이틀 1',
        createdAt: '2025-03-30T13:29:31.217Z',
        writer: {
          userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: '홍길동',
        },
        noticeType: 'ALL',
      },
      {
        noticeId: '2',
        title: '공지 타이틀 2',
        createdAt: '2025-03-30T13:29:31.217Z',
        writer: {
          userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: '김현정',
        },
        noticeType: 'SESSION',
      },
      {
        noticeId: '3',
        title: '공지 타이틀 3',
        createdAt: '2025-03-30T13:29:31.217Z',
        writer: {
          userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: '김백설',
        },
        noticeType: 'OPERATION',
      },
    ],
    totalCount: 3,
    totalPage: 0,
    page: 0,
    size: 0,
  },
  isSuccess: true,
};

export const getAllNotice = (
  page: number,
  size: number,
  noticeType: NoticeType,
) => {
  //   return axiosInstance.get<PaginatedApiResponse<NoticeRes>>(
  //     `/admin/v1/notices?page=${page}&size=${size}&noticeType=${noticeType}`,
  //   );
  return sampleAllNotice;
};

export const postNewNotice = (data: BaseNoticeReq): Promise<void> => {
  return axiosInstance.post('/admin/v1/notices', data);
};

export const getNoticeDetail = (noticeId: number) => {
  return axiosInstance.get<ApiResponse<NoticeDetailRes>>(
    `/admin/v1/notices/${noticeId}`,
  );
};

export const putNotice = (data: EditNoticeReq): Promise<void> => {
  return axiosInstance.put('/admin/v1/notices', data);
};

export const deleteNotice = (): Promise<void> => {
  return axiosInstance.delete('/admin/v1/notices');
};
