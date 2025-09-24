import { useQuery } from '@tanstack/react-query';

import { getTargetableNotices } from 'apis/session/SessionApis';

export const useTargetableNoticesQuery = (
  page: number,
  sessionId: string,
  search?: string,
) => {
  return useQuery({
    queryKey: ['targetable-notices', page, search],
    queryFn: () => getTargetableNotices({ page, size: 10, sessionId, search }),
    select: (data) => {
      return data.data.data;
    },
    retry: false,
  });
};
