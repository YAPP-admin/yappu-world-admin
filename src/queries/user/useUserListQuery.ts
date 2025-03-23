import { useQuery } from '@tanstack/react-query';
import {
  ErrorResponse,
  PaginatedApiResponse,
  PaginatedReq,
  PaginatedResponse,
} from 'apis/common/types';
import { UserList, UserListRes } from 'apis/user/types';
import { getUserList } from 'apis/user/UserApis';

export const useUserListQuery = ({ page, size }: PaginatedReq) => {
  return useQuery<
    PaginatedApiResponse<UserListRes>,
    ErrorResponse,
    PaginatedResponse<UserList>
  >({
    queryKey: ['user-list', page, size],
    queryFn: () => getUserList({ page, size }),
    select: (response) => ({
      totalCount: response.data.totalCount,
      page: response.data.page,
      size: response.data.size,
      totalPage: response.data.totalPage,
      data: response.data.data.map((user) => ({
        userId: user.userId,
        name: user.name,
        generation: user.lastActivityUnit.generation,
        position: user.lastActivityUnit.position,
        role: user.role.label,
        registrationDate: user.registrationDate,
        isActive: user.lastActivityUnit.isActive ? 'X' : 'O',
      })),
    }),
  });
};

export default useUserListQuery;
