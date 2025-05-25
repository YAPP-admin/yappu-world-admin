import axiosInstance from 'apis/common/axiosInstance';
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginatedReq,
} from 'apis/common/types';

import {
  AddGenerationReq,
  DeleteGenerationReq,
  EditGenerationReq,
  EditGenerationRes,
  GenerationListRes,
  OperationEditReq,
  OperationListRes,
  SupportVersionRes,
  VersionReq,
} from './types';

export const getOperationsList = async () => {
  return axiosInstance.get<ApiResponse<OperationListRes>>(
    '/admin/v1/operations/links',
  );
};

export const putOperationList = async (
  data: OperationEditReq,
): Promise<void> => {
  return axiosInstance.put('/admin/v1/operations/links', data);
};

export const getGenerationList = async ({ page, size }: PaginatedReq) => {
  return axiosInstance.get<PaginatedApiResponse<GenerationListRes>>(
    `/admin/v1/operations/generations?page=${page}&size=${size}`,
  );
};

export const postGeneration = async (data: AddGenerationReq): Promise<void> => {
  return axiosInstance.post('/admin/v1/operations/generations', data);
};

export const patchGenerationActive = async (data: EditGenerationReq) => {
  return axiosInstance.patch<ApiResponse<EditGenerationRes>>(
    '/admin/v1/operations/generations/active',
    data,
  );
};

export const getSupportVersion = () => {
  return axiosInstance.get<ApiResponse<SupportVersionRes>>(
    '/admin/v1/operations/minimum-support-versions',
  );
};

export const putSupportVersion = (data: VersionReq): Promise<void> => {
  return axiosInstance.put(
    '/admin/v1/operations/minimum-support-versions',
    data,
  );
};

export const deleteGeneration = (data: DeleteGenerationReq): Promise<void> => {
  return axiosInstance.delete('/admin/v1/operations/generations', { data });
};
