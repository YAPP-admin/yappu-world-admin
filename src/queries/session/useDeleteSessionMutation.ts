import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'react-router-dom';

import { deleteSession } from 'apis/session/SessionApis';
import { DeleteSessionReq } from 'apis/session/types';

export const useDeleteSessionMutation = () => {
  return useMutation<void, ErrorResponse, DeleteSessionReq>({
    mutationFn: (data) => deleteSession(data),
  });
};
