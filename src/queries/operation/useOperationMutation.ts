import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from 'apis/common/types';
import { putOperationList } from 'apis/operation/OperationApis';
import { OperationListInfo } from 'apis/operation/types';

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
