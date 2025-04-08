import { useMutation } from '@tanstack/react-query';
import { putSession } from 'apis/session/SessionApis';
import { EditSessionReq } from 'apis/session/types';
import { ErrorResponse } from 'react-router-dom';

export const useEditSessionMutation = () => {
  return useMutation<void, ErrorResponse, EditSessionReq>({
    mutationFn: (data) => putSession(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
  });
};
