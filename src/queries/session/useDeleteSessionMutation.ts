import { useMutation } from '@tanstack/react-query';
import { deleteSession } from 'apis/session/SessionApis';
import { DeleteSessionReq } from 'apis/session/types';
import { ErrorResponse } from 'react-router-dom';

export const useDeleteSessionMutation = () => {
  return useMutation<void, ErrorResponse, DeleteSessionReq>({
    mutationFn: (data) => deleteSession(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
  });
};
