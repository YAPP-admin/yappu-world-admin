import { AxiosResponse } from 'axios';

import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';

import {
  DeleteSessionReq,
  EditSessionReq,
  EligibleUsersRes,
  SesseionReq,
  SessionDetailRes,
  SessionReq,
  SessionRes,
  TargetableNoticesReq,
  TargetableNoticesRes,
} from './types';

export const getSession = ({ page, size, generation }: SessionReq) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (generation !== undefined) {
    params.append('generation', generation.toString());
  }

  return axiosInstance.get<PaginatedApiResponse<SessionRes>>(
    `/admin/v1/sessions?${params.toString()}`,
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

export const getTargetableNotices = ({
  page,
  size,
  sessionId,
  search,
}: TargetableNoticesReq) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sessionId: sessionId.toString(),
  });

  if (search !== undefined) {
    params.append('search', search.toString());
  }
  return axiosInstance.get<PaginatedApiResponse<TargetableNoticesRes>>(
    `/admin/v1/sessions/targetable-notices?${params.toString()}`,
  );
};
