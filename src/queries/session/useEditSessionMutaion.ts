import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'react-router-dom';

import { putSession } from 'apis/session/SessionApis';
import { EditSessionReq } from 'apis/session/types';

export const useEditSessionMutation = () => {
  return useMutation<void, ErrorResponse, EditSessionReq>({
    mutationFn: (data) => putSession(data),
  });
};
