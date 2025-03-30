import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { useAuthStore } from '@stores/authStore';
import { postLogin } from 'apis/auth/AuthApis';
import { LoginReq, LoginRes } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';


export const useLoginMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation<
    AxiosResponse<ApiResponse<LoginRes>>,
    AxiosError<ErrorResponse>,
    LoginReq
  >({
    mutationFn: (data) => postLogin(data),
    onSuccess: (res) => {
      console.log('res :', res);

      if (res.data.isSuccess) {
        setToken(res.data.data);
      }
    },
    onError: (err) => {
      if (err.response) {
        const errorData = err.response.data;
        console.error('서버 에러 메세지', errorData.message);
      } else {
        console.error('error :', err.message);
      }
    },
  });
};
