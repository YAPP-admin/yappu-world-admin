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
  return axiosInstance.get<ApiResponse<OperationListRes>>(
    '/admin/v1/operations/links',
  );
};

export const putOperationList = async (
  data: OperationListInfo,
): Promise<void> => {
  return axiosInstance.put('/admin/v1/operations/links', data);
};

// 기수 목록
export const getGenerationList = async ({ page, size }: PaginatedReq) => {
  return axiosInstance.get<PaginatedApiResponse<GenerationListRes>>(
    `/admin/v1/operations/generations?page=${page}&size=${size}`,
  );
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
