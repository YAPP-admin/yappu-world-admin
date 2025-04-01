import { useQuery } from '@tanstack/react-query';

import { getUserDetail } from 'apis/user/UserApis';

export const useUserDetailQuery = (userId: number) => {
  return useQuery({
    queryKey: ['user-detail', userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  });
};
