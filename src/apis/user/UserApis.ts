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
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '홍길동',
        email: 'abc@abc.com',
        role: {
          name: 'ADMIN',
          label: '어드민',
        },
        lastActivityUnit: {
          generation: 2,
          position: 'PM',
        },
      },
      {
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '김현정',
        email: 'guswjd@naver.com',
        role: {
          name: 'ADMIN',
          label: '어드민',
        },
        lastActivityUnit: {
          generation: 2,
          position: 'PM',
        },
      },
      {
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '김백설',
        email: 'qortjf@naver.com',
        role: {
          name: 'ADMIN',
          label: '어드민',
        },
        lastActivityUnit: {
          generation: 2,
          position: 'Web',
        },
      },
      {
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '김건호',
        email: 'rjsgh@naver.com',
        role: {
          name: 'ADMIN',
          label: '어드민',
        },
        lastActivityUnit: {
          generation: 2,
          position: 'Android',
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
    userId: '01954c67-0c2b-d741-4561-ed80b4c28d0c',
    name: '홍길동',
    email: 'email@email.com',
    role: {
      name: 'ADMIN',
      label: '관리자',
    },
    isActive: true,
    activityUnits: [
      {
        generation: 1,
        position: 'Web',
      },
      {
        generation: 2,
        position: 'Android',
      },
      {
        generation: 3,
        position: 'PM',
      },
    ],
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
