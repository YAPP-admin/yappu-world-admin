import { AxiosResponse } from 'axios';

import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';

import {
  DeleteSessionReq,
  EditSessionReq,
  EligibleUsersRes,
  SesseionReq,
  SessionDetailRes,
  SessionRes,
} from './types';

export const getSession = ({ page, size }: PaginatedReq) => {
  return axiosInstance.get<PaginatedApiResponse<SessionRes>>(
    `/admin/v1/sessions?page=${page}&size=${size}`,
  );
};

export const putSession = (data: EditSessionReq): Promise<void> => {
  return axiosInstance.put('/admin/v1/sessions', data);
};

export const postSession = (data: SesseionReq): Promise<AxiosResponse> => {
  return axiosInstance.post('/admin/v1/sessions', data);
};

export const deleteSession = (data: DeleteSessionReq): Promise<void> => {
  return axiosInstance.delete('/admin/v1/sessions', { data });
};

export const getSessionDetail = (sessionId: string) => {
  return axiosInstance.get<ApiResponse<SessionDetailRes>>(
    `/admin/v1/sessions/${sessionId}`,
  );
};

export const getEligibleUsers = (generation: string) => {
  return axiosInstance.get<ApiResponse<EligibleUsersRes>>(
    `/admin/v1/session-eligible-users?generation=${generation}`,
  );
};
