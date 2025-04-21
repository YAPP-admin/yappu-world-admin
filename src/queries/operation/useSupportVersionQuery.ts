import { useQuery } from '@tanstack/react-query';

import { getSupportVersion } from 'apis/operation/OperationApis';

export const useSupportVersionQuery = () => {
  return useQuery({
    queryKey: ['support-version'],
    queryFn: () => getSupportVersion(),
    select: (res) => {
      return res.data.data;
    },
  });
};
