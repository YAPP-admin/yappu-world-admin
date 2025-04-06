import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';
import { postLogin } from 'apis/auth/AuthApis';
import { LoginReq, LoginRes } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { LoginType } from 'types/formTypes';

export const useLoginMutation = (setError: UseFormSetError<LoginType>) => {
  const setToken = useAuthStore((state) => state.setToken);
  const naviagte = useNavigate();

  return useMutation<
    AxiosResponse<ApiResponse<LoginRes>>,
    AxiosError<ErrorResponse>,
    LoginReq
  >({
    mutationFn: (data) => postLogin(data),
    onSuccess: (res) => {
      if (res.data.isSuccess) {
        setToken(res.data.data);
        naviagte('/admin/members/list');
      }
    },
    onError: (err) => {
      if (err.response) {
        const errorData = err.response.data;
        if (err.response.status === 400) {
          window.alert(`${errorData.errorCode}\n${errorData.message}`);
        } else if (err.response.status === 401) {
          if (errorData.errorCode === 'USR_1105') {
            // 비밀번호 오류
            setError('password', {
              type: 'manual',
              message: errorData.message || '등록되지 않은 이메일입니다.',
            });
          }
        } else if (err.response.status === 404) {
          if (errorData.errorCode === 'USR_1101') {
            // 이메일 오류
            setError('email', {
              type: 'manual',
              message: errorData.message || '등록되지 않은 이메일입니다.',
            });
          }
        } else if (err.response.status === 409) {
          // if (errorData.errorCode === 'USR_1102') {
          //   // 회원가입 처리가 진행 중입니다.
          // } else if (errorData.errorCode === 'USR_1103') {
          //   // 최근의 회원가입 신청은 거절되었습니다.
          // } else if (errorData.errorCode === 'USR_1104') {
          //   // 로그인이 불가능한 회원 상태입니다.
          // }
          window.alert(`${errorData.errorCode}\n${errorData.message}`);
        }
        console.error('login error ', errorData.message);
      } else {
        console.error('login error :', err.message);
      }
    },
  });
};
