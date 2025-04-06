import { useQuery } from '@tanstack/react-query';

import { getGenerationList } from 'apis/operation/OperationApis';

export const useGenerationListQuery = (page: number) => {
  return useQuery({
    queryKey: ['generation-list', page],
    queryFn: () => getGenerationList({ page, size: 10 }),
    select: (data) => {
      return data.data.data;
    },
    retry: false,
  });
};
