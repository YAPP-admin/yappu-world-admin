import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';
import {
  DeleteSessionReq,
  EditSessionReq,
  SesseionReq,
  SessionDetailRes,
  SessionRes,
} from './types';

export const getSession = () => {
  return axiosInstance.get<PaginatedApiResponse<SessionRes>>(
    '/admin/v1/sessions',
  );
};

export const putSession = (data: EditSessionReq) => {
  return axiosInstance.put('/admin/v1/sessions', data);
};

export const postSession = (data: SesseionReq) => {
  return axiosInstance.post('/admin/v1/sessions', data);
};

export const deleteSession = (data: DeleteSessionReq) => {
  return axiosInstance.delete('/admin/v1/sessions', { data });
};

export const getSessionDetail = (sessionId: string) => {
  return axiosInstance.get<ApiResponse<SessionDetailRes>>(
    `/admin/v1/sessions/${sessionId}`,
  );
};
