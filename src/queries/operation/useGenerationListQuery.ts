import { useQuery } from '@tanstack/react-query';

import { getGenerationList } from 'apis/operation/OperationApis';

export const useGenerationListQuery = (page: number, size = 10) => {
  return useQuery({
    queryKey: ['generation-list', page],
    queryFn: () => getGenerationList({ page, size }),
    select: (data) => {
      return data.data.data;
    },
    retry: false,
  });
};
