import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'apis/common/types';
import { postGeneration } from 'apis/operation/OperationApis';
import { AddGenerationReq } from 'apis/operation/types';
import { AxiosError } from 'axios';

export const useAddGenerationMutation = () => {
  return useMutation<void, AxiosError<ErrorResponse>, AddGenerationReq>({
    mutationFn: (data) => postGeneration(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
    onError: (err) => {
      console.log('err :', err);
    },
  });
};
