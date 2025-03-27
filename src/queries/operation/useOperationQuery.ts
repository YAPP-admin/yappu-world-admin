import { useQuery } from '@tanstack/react-query';
import { getOperationsList } from 'apis/operation/OperationApis';

export const useOperationQuery = () => {
  return useQuery({
    queryKey: ['link'],
    queryFn: () => getOperationsList(),
    retry: false,
  });
};
