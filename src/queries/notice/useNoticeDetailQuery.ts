import { useQuery } from '@tanstack/react-query';

import { getNoticeDetail } from 'apis/notice/NoticeApis';

export const useNoticeDetailQuery = (noticeId: string) => {
  return useQuery({
    queryKey: ['notice-detail', noticeId],
    queryFn: () => getNoticeDetail(noticeId),
    select: (data) => {
      return data.data.data;
    },
    enabled: !!noticeId,
    retry: false,
  });
};
