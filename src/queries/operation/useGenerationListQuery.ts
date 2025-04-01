import { useQuery } from '@tanstack/react-query';

import { getGenerationList } from 'apis/operation/OperationApis';

export const useGenerationListQuery = () => {
  return useQuery({
    queryKey: ['generation-list'],
    queryFn: () => getGenerationList({ page: 1, size: 10 }),
    select: (data) => {
      console.log('data :', data);
      return data.data;
    },
    retry: false,
  });
};
