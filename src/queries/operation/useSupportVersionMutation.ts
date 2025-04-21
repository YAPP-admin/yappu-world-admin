import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from 'apis/common/types';
import { putSupportVersion } from 'apis/operation/OperationApis';
import { VersionReq } from 'apis/operation/types';

export const useSupportVersionMutation = () => {
  return useMutation<void, AxiosError<ErrorResponse>, VersionReq>({
    mutationFn: (data) => putSupportVersion(data),
  });
};
