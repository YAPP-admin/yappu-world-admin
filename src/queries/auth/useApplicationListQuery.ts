import { useQuery } from '@tanstack/react-query';

import { getApplicationList } from 'apis/auth/AuthApis';

export const useApplicationListQuery = (page: number, size: number) => {
  return useQuery({
    queryKey: ['application-list', page],
    queryFn: () => getApplicationList({ page, size }),
    select: (data) => {
      return data.data;
    },
  });
};
