import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from 'apis/user/UserApis';

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(),
    select: (res) => {
      return res.data.data;
    },
    enabled: false,
  });
};
