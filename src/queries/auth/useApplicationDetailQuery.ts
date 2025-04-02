import { useQuery } from '@tanstack/react-query';

import { getApplicationDetail } from 'apis/auth/AuthApis';

export const useApplicationDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['application-detail', id],
    queryFn: () => getApplicationDetail(id),
    select: (data) => {
      return data.data;
    },
    enabled: !!id,
  });
};
