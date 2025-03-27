import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'apis/common/types';
import { putOperationList } from 'apis/operation/OperationApis';
import { OperationListInfo } from 'apis/operation/types';
import { AxiosError, AxiosResponse } from 'axios';

export const useOperationMutation = () => {
  return useMutation<void, AxiosError<ErrorResponse>, OperationListInfo>({
    mutationFn: (data) => putOperationList(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
    onError: (err) => {
      console.log('err :', err);
    },
  });
};
