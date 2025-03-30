import { useQuery } from '@tanstack/react-query';
import { getAllNotice } from 'apis/notice/NoticeApis';

export const useAllNoticeQuery = () => {
  return useQuery({
    queryKey: ['notice-list'],
    queryFn: () => getAllNotice(1, 10, 'ALL'),
  });
};
