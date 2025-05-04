import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';

import {
  ApplicationApproveReq,
  ApplicationDetailRes,
  ApplicationListRes,
  ApplicationRejectReq,
  DeleteMemberCodeReq,
  EidtUserRoleReq,
  LoginReq,
  LoginRes,
  MemberCodeReq,
  MemberCodeRes,
  ReissueTokenReq,
} from './types';

export const postLogin = (data: LoginReq) => {
  return axiosInstance.post<ApiResponse<LoginRes>>(
    '/admin/v1/auth/login',
    data,
  );
};

export const getMemberCode = () => {
  return axiosInstance.get<ApiResponse<MemberCodeRes>>(
    '/admin/v1/auth/authentication-codes',
  );
};

export const patchMemberCode = (data: MemberCodeReq) => {
  return axiosInstance.patch<ApiResponse<null>>(
    '/admin/v1/auth/authentication-codes',
    data,
  );
};

export const deleteMemberCode = (data: DeleteMemberCodeReq): Promise<void> => {
  return axiosInstance.delete('/admin/v1/auth/authentication-codes', { data });
};

export const postApplicationReject = (data: ApplicationRejectReq) => {
  return axiosInstance.post<ApiResponse<void>>(
    '/admin/v1/auth/applications/reject',
    data,
  );
};

export const postApplicationApprove = (data: ApplicationApproveReq) => {
  return axiosInstance.post<ApiResponse<void>>(
    '/admin/v1/auth/applications/approve',
    data,
  );
};

export const patchUserRole = (data: EidtUserRoleReq) => {
  return axiosInstance.post<ApiResponse<void>>('/admin/v1/users/role', data);
};

export const getApplicationList = ({ page, size }: PaginatedReq) => {
  return axiosInstance.get<PaginatedApiResponse<ApplicationListRes>>(
    `/admin/v1/auth/applications?page=${page}&size=${size}`,
  );
};

export const getApplicationDetail = (applicationId: string) => {
  return axiosInstance.get<ApiResponse<ApplicationDetailRes>>(
    `/admin/v1/auth/applications/${applicationId}`,
  );
};

export const postReissueToken = (data: ReissueTokenReq) => {
  return axiosInstance.post<ApiResponse<LoginRes>>(
    '/admin/v1/auth/reissue-token',
    data,
  );
};
