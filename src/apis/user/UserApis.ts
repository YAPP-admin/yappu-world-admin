import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';

import {
  UserDetailReq,
  UserDetailRes,
  UserListReq,
  UserListRes,
  UserProfileRes,
} from './types';

export const getUserList = ({
  page,
  size,
  name,
  generation,
  position,
  role,
}: UserListReq) => {
  return axiosInstance.get<PaginatedApiResponse<UserListRes>>(
    `/admin/v1/users?page=${page}&size=${size}&name=${name}&generation=${generation}&position=${position}&role=${role}`,
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

export const getUserProfile = () => {
  return axiosInstance.get<ApiResponse<UserProfileRes>>(
    '/admin/v1/users/profile',
  );
};
