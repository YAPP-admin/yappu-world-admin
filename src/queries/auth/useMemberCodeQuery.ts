import { useQuery } from '@tanstack/react-query';

import { getMemberCode } from 'apis/auth/AuthApis';

export const useMemberCodeQuery = () => {
  return useQuery({
    queryKey: ['member-code-list'],
    queryFn: () => getMemberCode(),
    select: (res) => {
      return res.data.data;
    },
  });
};

export default useMemberCodeQuery;
