import { useQuery } from '@tanstack/react-query';

import { UserListReq } from 'apis/user/types';
import { getUserList } from 'apis/user/UserApis';

export const useUserListQuery = ({
  page,
  size,
  name,
  generation,
  position,
  role,
}: UserListReq) => {
  return useQuery({
    queryKey: ['user-list', page, size, generation, position, role],
    queryFn: () =>
      getUserList({ page, size, name, generation, position, role }),
    select: (response) => ({
      totalCount: response.data.data.totalCount,
      page: response.data.data.page,
      size: response.data.data.size,
      totalPages: response.data.data.totalPages,
      data: response.data.data.data.map((user) => ({
        userId: user.userId,
        name: user.name,
        email: user.email,
        generation: user.lastActivityUnit.generation,
        position: user.lastActivityUnit.position,
        role: user.role,
        registrationDate: user.registrationDate,
        isActive: user.lastActivityUnit.isActive ? 'X' : 'O',
      })),
    }),
  });
};

export default useUserListQuery;
