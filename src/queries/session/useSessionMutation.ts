import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from 'react-router-dom';

import { postSession } from 'apis/session/SessionApis';
import { SesseionReq } from 'apis/session/types';

export const useSessionMutation = () => {
  return useMutation<AxiosResponse, ErrorResponse, SesseionReq>({
    mutationFn: (data) => postSession(data),
  });
};
