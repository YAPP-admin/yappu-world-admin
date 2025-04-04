import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from 'apis/common/types';
import { postGeneration } from 'apis/operation/OperationApis';
import { AddGenerationReq } from 'apis/operation/types';
import { useGenerationStore } from '@stores/generationStore';

export const useAddGenerationMutation = () => {
  const queryClient = useQueryClient();
  const page = useGenerationStore((state) => state.page);
  const handleAddPopupOpen = useGenerationStore(
    (state) => state.handleAddPopupOpen,
  );
  const handleAddCompletePopupOpen = useGenerationStore(
    (state) => state.handleAddCompletePopupOpen,
  );
  return useMutation<void, AxiosError<ErrorResponse>, AddGenerationReq>({
    mutationFn: (data) => postGeneration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation-list', page] });
      handleAddPopupOpen(false);
      handleAddCompletePopupOpen(true);
    },
    onError: (err) => {
      console.error('add generation err :', err);
    },
  });
};
