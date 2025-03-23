import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';
import { UserDetailRes, UserListRes } from './types';

const sampleData: PaginatedApiResponse<UserListRes> = {
  data: {
    data: [
      {
        userId: '1',
        name: '홍길동',
        email: 'abc@abc.com',
        role: {
          name: 'ADMIN',
          label: '관리자',
        },
        registrationDate: '2025.02.13',
        lastActivityUnit: {
          id: '1',
          generation: 2,
          position: 'PM',
          isActive: true,
        },
      },
      {
        userId: '2',
        name: '김현정',
        email: 'guswjd@naver.com',
        role: {
          name: 'ACTIVE',
          label: '활동회원',
        },
        registrationDate: '2025.02.13',
        lastActivityUnit: {
          id: '1',
          generation: 2,
          position: 'PM',
          isActive: true,
        },
      },
      {
        userId: '3',
        name: '김백설',
        email: 'qortjf@naver.com',
        role: {
          name: 'STAFF',
          label: '운영진',
        },
        registrationDate: '2025.02.13',
        lastActivityUnit: {
          id: '1',
          generation: 2,
          position: 'Web',
          isActive: true,
        },
      },
      {
        userId: '4',
        name: '김건호',
        email: 'rjsgh@naver.com',
        role: {
          name: 'GRADUATE',
          label: '수료회원',
        },
        registrationDate: '2025.02.13',
        lastActivityUnit: {
          id: '1',
          generation: 2,
          position: 'Android',
          isActive: false,
        },
      },
    ],
    totalCount: 4,
    page: 1,
    size: 10,
    totalPage: 1,
  },
  isSuccess: true,
};

const userDetail: ApiResponse<UserDetailRes> = {
  data: {
    id: '1',
    name: '홍길동',
    email: 'email@email.com',
    role: '관리자',
    isActive: true,
    activityUnits: [
      {
        id: '1',
        generation: 1,
        position: 'Web',
        isActive: false,
      },
      {
        id: '2',
        generation: 2,
        position: 'Android',
        isActive: false,
      },
      {
        id: '3',
        generation: 3,
        position: 'PM',
        isActive: true,
      },
    ],
    phoneNumber: '010-1234-5678',
    gender: '남',
    joinDate: '2025.03.21',
  },
  isSuccess: true,
};

export const getUserList = async ({
  page,
  size,
}: PaginatedReq): Promise<PaginatedApiResponse<UserListRes>> => {
  // const response = await axiosInstance.get<PaginatedApiResponse<UserListRes>>(
  //   `/admin/v1/users?page=${page}&size=${size}`,
  // );
  // return response.data;
  return sampleData;
};

export const getUserDetail = async (userId: number) => {
  // return axiosInstance.get<ApiResponse<UserDetailRes>>(
  //   `/admin/v1/users/${userId}`,
  // );
  return userDetail;
};
