import { useQuery } from '@tanstack/react-query';

import { getApplicationList } from 'apis/auth/AuthApis';
import { ApplicationListReq } from 'apis/auth/types';

export const useApplicationListQuery = ({
  page,
  size,
  name,
  generation,
  position,
  status,
}: ApplicationListReq) => {
  return useQuery({
    queryKey: ['application-list', page],
    queryFn: () =>
      getApplicationList({ page, size, name, generation, position, status }),
    select: (data) => {
      return data.data.data;
    },
    retry: false,
  });
};
