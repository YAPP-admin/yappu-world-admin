import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'react-router-dom';

import { postSession } from 'apis/session/SessionApis';
import { SesseionReq } from 'apis/session/types';

export const useSessionMutation = () => {
  return useMutation<void, ErrorResponse, SesseionReq>({
    mutationFn: (data) => postSession(data),
    onSuccess: (res) => {
      console.log('res :', res);
    },
  });
};
