import { useQuery } from '@tanstack/react-query';

import { getSessionDetail } from 'apis/session/SessionApis';

export const useSessionDetailQuery = (sessionId: string) => {
  return useQuery({
    queryKey: ['session-detail', sessionId],
    queryFn: () => getSessionDetail(sessionId),
    select: (res) => {
      return res.data.data;
    },
    retry: false,
  });
};
