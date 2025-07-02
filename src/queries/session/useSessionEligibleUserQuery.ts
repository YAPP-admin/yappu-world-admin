import { useQuery } from '@tanstack/react-query';

import { getEligibleUsers } from 'apis/session/SessionApis';

export const useSessionEligibleUserQuery = (generation: string) => {
  return useQuery({
    queryKey: ['eligible-user', generation],
    queryFn: () => getEligibleUsers(generation),
    select: (res) => {
      return res.data.data;
    },
    enabled: !!generation,
    retry: false,
  });
};
