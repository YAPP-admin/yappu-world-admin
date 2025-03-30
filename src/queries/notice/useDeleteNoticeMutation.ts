import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'apis/common/types';
import { deleteNotice } from 'apis/notice/NoticeApis';

export const useDeleteNoticeMutation = (noticeId: number) => {
  return useMutation<void, ErrorResponse, number>({
    mutationFn: () => deleteNotice(),
  });
};
