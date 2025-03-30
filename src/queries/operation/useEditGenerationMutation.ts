import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'react-router-dom';

import { ApiResponse } from 'apis/common/types';
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
      console.log('err :', err);
    },
  });
};
