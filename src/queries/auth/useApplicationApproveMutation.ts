import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { postApplicationApprove } from 'apis/auth/AuthApis';
import { ApplicationApproveReq } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';

export const useApplicationApproveMutation = () => {
  return useMutation<
    AxiosResponse<ApiResponse<void>>,
    ErrorResponse,
    ApplicationApproveReq
  >({
    mutationFn: (data) => postApplicationApprove(data),
  });
};
