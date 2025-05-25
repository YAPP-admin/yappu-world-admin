import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'react-router-dom';

import { deleteGeneration } from 'apis/operation/OperationApis';
import { DeleteGenerationReq } from 'apis/operation/types';

export const useDeleteGenerationMutation = () => {
  return useMutation<void, ErrorResponse, DeleteGenerationReq>({
    mutationFn: (data) => deleteGeneration(data),
  });
};
