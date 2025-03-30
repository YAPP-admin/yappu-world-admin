import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';

import { UserDetailReq, UserDetailRes, UserListRes } from './types';

export const getUserList = async ({
  page,
  size,
}: PaginatedReq): Promise<PaginatedApiResponse<UserListRes>> => {
  const response = await axiosInstance.get<PaginatedApiResponse<UserListRes>>(
    `/admin/v1/users?page=${page}&size=${size}`,
  );
  return response.data;
};

export const getUserDetail = async (userId: number) => {
  return axiosInstance.get<ApiResponse<UserDetailRes>>(
    `/admin/v1/users/${userId}`,
  );
};

export const putUserDetail = async (data: UserDetailReq) => {
  return axiosInstance.put<ApiResponse<string>>(`/admin/v1/users`, data);
};
