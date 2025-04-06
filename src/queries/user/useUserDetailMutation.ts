import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { UserDetailReq } from 'apis/user/types';
import { putUserDetail } from 'apis/user/UserApis';

export const useUserDetailMutation = () => {
  return useMutation<
    AxiosResponse<ApiResponse<string>>,
    AxiosError<ErrorResponse>,
    UserDetailReq
  >({
    mutationFn: (data) => putUserDetail(data),
  });
};
