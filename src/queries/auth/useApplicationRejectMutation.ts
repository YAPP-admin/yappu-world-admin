import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { postApplicationReject } from 'apis/auth/AuthApis';
import { ApplicationRejectReq } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';

export const useApplicationRejectMutaion = () => {
  return useMutation<
    AxiosResponse<ApiResponse<void>>,
    ErrorResponse,
    ApplicationRejectReq
  >({
    mutationFn: (data) => postApplicationReject(data),
  });
};
