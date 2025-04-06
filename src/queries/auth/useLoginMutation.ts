import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { postLogin } from 'apis/auth/AuthApis';
import { LoginReq, LoginRes } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';

export const useLoginMutation = () => {
  return useMutation<
    AxiosResponse<ApiResponse<LoginRes>>,
    AxiosError<ErrorResponse>,
    LoginReq
  >({
    mutationFn: (data) => postLogin(data),
  });
};
