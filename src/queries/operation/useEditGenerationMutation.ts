import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { useGenerationStore } from '@stores/generationStore';
import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { patchGenerationActive } from 'apis/operation/OperationApis';
import { EditGenerationReq, EditGenerationRes } from 'apis/operation/types';

export const useEditGenerationMutation = () => {
  const page = useGenerationStore((state) => state.page);
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse<EditGenerationRes>>,
    AxiosError<ErrorResponse>,
    EditGenerationReq
  >({
    mutationFn: (data) => patchGenerationActive(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation-list', page] });
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
