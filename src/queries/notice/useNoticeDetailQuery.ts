import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from 'apis/notice/NoticeApis';

export const useNoticeDetailQuery = (noticeId: number) => {
  return useQuery({
    queryKey: ['notice-detail', noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });
};
