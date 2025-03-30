import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';
import {
  AddGenerationReq,
  EditGenerationReq,
  EditGenerationRes,
  GenerationListRes,
  OperationListInfo,
  OperationListRes,
} from './types';

export const getOperationsList = async () => {
  //   return axiosInstance.get<ApiResponse<OperationListRes>>(
  //     '/admin/v1/operations/links',
  //   );
  return list.data;
};

export const putOperationList = async (
  data: OperationListInfo,
): Promise<void> => {
  return axiosInstance.put('/admin/v1/operations/links', data);
};

const list: ApiResponse<OperationListRes> = {
  data: {
    links: [
      {
        id: 'privacyPolicyLink',
        label: '개인정보 처리방침',
        value:
          'https://yapp-workspace.notion.site/fc24f8ba29c34f9eb30eb945c621c1ca?pvs=4',
      },
      {
        id: 'termsOfServiceLink',
        label: '이용약관',
        value:
          'https://yapp-workspace.notion.site/48f4eb2ffdd94740979e8a3b37ca260d?pvs=4',
      },
      {
        id: 'kakaoLink',
        label: '문의 카톡 링크',
        value: 'https://open.kakao.com/asdasdfasdfav/asdfadf',
      },
    ],
  },
  isSuccess: true,
};

const sampleGenerationList = {
  data: {
    data: [
      {
        generation: 26,
        startDate: '2025-03-03',
        endDate: '2025-09-14',
        isActive: true,
      },
      {
        generation: 25,
        startDate: '2024-05-03',
        endDate: '2024-09-14',
        isActive: false,
      },
      {
        generation: 3,
        startDate: null,
        endDate: null,
        isActive: false,
      },
    ],
    totalCount: 3,
    totalPage: 2,
    page: 1,
    size: 2,
  },
  isSuccess: true,
};

// 기수 목록
export const getGenerationList = async ({ page, size }: PaginatedReq) => {
  // return axiosInstance.get<PaginatedApiResponse<GenerationListRes>>(
  //   `/admin/v1/operations/generations?page=${page}&size=${size}`,
  // );
  return sampleGenerationList;
};

// 기수 신규 등록
export const postGeneration = async (data: AddGenerationReq): Promise<void> => {
  return axiosInstance.post('/admin/v1/operations/generations', data);
};

// 기수 활성화 변경
export const patchGenerationActive = async (data: EditGenerationReq) => {
  return axiosInstance.patch<ApiResponse<EditGenerationRes>>(
    '/admin/v1/operations/generations/active',
    data,
  );
};
