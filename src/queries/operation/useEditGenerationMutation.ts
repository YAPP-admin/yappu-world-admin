import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { useGenerationStore } from '@stores/generationStore';
import { ApiResponse, ErrorResponse } from 'apis/common/types';
import { patchGenerationActive } from 'apis/operation/OperationApis';
import { EditGenerationReq, EditGenerationRes } from 'apis/operation/types';
import { showErrorToast } from 'types/showErrorToast';

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
        showErrorToast(errorData.message);
      }
    },
  });
};
