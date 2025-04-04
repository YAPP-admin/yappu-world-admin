import { useQuery } from '@tanstack/react-query';

import { getAllNotice } from 'apis/notice/NoticeApis';

export const useAllNoticeQuery = (page: number) => {
  return useQuery({
    queryKey: ['notice-list', page],
    queryFn: () => getAllNotice(page, 10, 'ALL'),
    select: (data) => {
      return data.data.data;
    },
    retry: false,
  });
};
