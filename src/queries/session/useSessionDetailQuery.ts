import { useQuery } from '@tanstack/react-query';

import { getSessionDetail } from 'apis/session/SessionApis';

export const useSessionDetailQuery = (sessionId: string) => {
  return useQuery({
    queryKey: ['query-detail'],
    queryFn: () => getSessionDetail(sessionId),
    select: (res) => {
      return res.data.data;
    },
  });
};
