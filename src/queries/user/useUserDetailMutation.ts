import { useMutation } from '@tanstack/react-query';
import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { UserDetailReq } from 'apis/user/types';
import { putUserDetail } from 'apis/user/UserApis';
import { AxiosError, AxiosResponse } from 'axios';

export const useUserDetailMutation = () => {
  return useMutation<
    AxiosResponse<ApiResponse<string>>,
    AxiosError<ErrorResponse>,
    UserDetailReq
  >({
    mutationFn: (data) => putUserDetail(data),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      if (err.response) {
      }
    },
  });
};
