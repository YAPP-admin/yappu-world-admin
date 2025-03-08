import axiosInstance from 'apis/common/axiosInstance';
import { LoginReq, LoginRes } from './types';
import { ApiResponse } from 'apis/common/types';

export const postLogin = async (data: LoginReq) => {
  return axiosInstance.post<ApiResponse<LoginRes>>('/v1/auth/login', data);
};
