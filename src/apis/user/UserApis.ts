import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';

import { UserDetailReq, UserDetailRes, UserListRes } from './types';

export const getUserList = ({ page, size }: PaginatedReq) => {
  return axiosInstance.get<PaginatedApiResponse<UserListRes>>(
    `/admin/v1/users?page=${page}&size=${size}`,
  );
};

export const getUserDetail = (userId: string) => {
  return axiosInstance.get<ApiResponse<UserDetailRes>>(
    `/admin/v1/users/${userId}`,
  );
};

export const putUserDetail = (data: UserDetailReq) => {
  return axiosInstance.put<ApiResponse<string>>(`/admin/v1/users`, data);
};
