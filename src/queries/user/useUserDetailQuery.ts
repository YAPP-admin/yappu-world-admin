import { useQuery } from '@tanstack/react-query';

import { getUserDetail } from 'apis/user/UserApis';

export const useUserDetailQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user-detail', userId],
    queryFn: () => getUserDetail(userId),
    select: (res) => {
      return res.data.data;
    },
    enabled: !!userId,
  });
};
