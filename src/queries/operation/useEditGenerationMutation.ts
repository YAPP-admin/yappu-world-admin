import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { patchGenerationActive } from 'apis/operation/OperationApis';
import { EditGenerationReq, EditGenerationRes } from 'apis/operation/types';

export const useEditGenerationMutation = () => {
  return useMutation<
    AxiosResponse<ApiResponse<EditGenerationRes>>,
    AxiosError<ErrorResponse>,
    EditGenerationReq
  >({
    mutationFn: (data) => patchGenerationActive(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
    onError: (err) => {
      if (err.response) {
        const errorData = err.response.data;
        if (err.response.status === 404) {
          if (errorData.errorCode === 'OPR_1000') {
            window.alert(`${errorData.errorCode}\n${errorData.message}`);
          }
        } else if (err.response.status === 409) {
          if (errorData.errorCode === 'OPR_1001') {
            window.alert(`${errorData.errorCode}\n${errorData.message}`);
          }
        }
        console.error('login error ', errorData.message);
      }
    },
  });
};
