import { useQuery } from '@tanstack/react-query';
import { PaginatedReq } from 'apis/common/types';
import { getUserList } from 'apis/user/UserApis';

export const useUserListQuery = ({ page, size }: PaginatedReq) => {
  return useQuery({
    queryKey: ['user-list', page, size],
    queryFn: () => getUserList({ page, size }),
    select: (response) => ({
      ...response,
      data: {
        ...response.data,
        data: response.data.data.map((user, index) => ({
          index: index + 1,
          userId: user.userId,
          name: user.name,
          email: user.email,
          generation: user.lastActivityUnit.generation,
          position: user.lastActivityUnit.position,
          role: user.role.label,
          date: '-',
          isExit: 'X',
        })),
      },
    }),
  });
};

export default useUserListQuery;
