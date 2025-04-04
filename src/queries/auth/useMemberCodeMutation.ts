import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { patchMemberCode } from 'apis/auth/AuthApis';
import { MemberCodeReq } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';

export const useMemberCodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ApiResponse<null>>,
    AxiosError<ErrorResponse>,
    MemberCodeReq
  >({
    mutationFn: (data) => patchMemberCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-code-list'] });
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
