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
  EidtUserRoleReq,
  LoginReq,
  LoginRes,
  MemberCodeReq,
  MemberCodeRes,
} from './types';

export const postLogin = (data: LoginReq) => {
  return axiosInstance.post<ApiResponse<LoginRes>>(
    '/admin/v1/auth/login',
    data,
  );
};

export const getMemberCode = async () => {
  // return axiosInstance.get<ApiResponse<MemberCodeRes[]>>(
  //   '/admin/v1/auth/authentication-codes',
  // );
  return memberCode;
};

export const patchMemberCode = async (data: MemberCodeReq) => {
  return axiosInstance.patch<ApiResponse<null>>(
    '/admin/v1/auth/authentication-codes',
    data,
  );
};

const memberCode: MemberCodeRes[] = [
  {
    code: '000000',
    role: {
      name: 'ADMIN',
      label: '관리자',
    },
  },
  {
    code: '000001',
    role: {
      name: 'STAFF',
      label: '운영진',
    },
  },
  {
    code: '000002',
    role: {
      name: 'ALUMNI',
      label: '정회원',
    },
  },
  {
    code: '000003',
    role: {
      name: 'GRADUATE',
      label: '수료회원',
    },
  },
  {
    code: '000004',
    role: {
      name: 'ACTIVE',
      label: '활동회원',
    },
  },
];

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
