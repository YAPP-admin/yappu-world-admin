import axiosInstance from 'apis/common/axiosInstance';
import { LoginReq, LoginRes, MemberCodeReq, MemberCodeRes } from './types';
import { ApiResponse } from 'apis/common/types';

export const postLogin = async (data: LoginReq) => {
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
