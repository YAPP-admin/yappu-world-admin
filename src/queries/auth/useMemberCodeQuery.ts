import { useQuery } from '@tanstack/react-query';

import { getMemberCode } from 'apis/auth/AuthApis';

export const useMemberCodeQuery = () => {
  return useQuery({
    queryKey: ['member-code'],
    queryFn: () => getMemberCode(),
  });
};

export default useMemberCodeQuery;
