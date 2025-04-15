import { useQuery } from '@tanstack/react-query';

import { getSession } from 'apis/session/SessionApis';

export const useSessionQuery = (page: number) => {
  return useQuery({
    queryKey: ['session-list', page],
    queryFn: () => getSession({ page, size: 10 }),
    select: (data) => {
      return data.data.data;
    },
  });
};
