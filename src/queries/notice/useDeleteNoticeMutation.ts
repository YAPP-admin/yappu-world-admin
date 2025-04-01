import { useMutation } from '@tanstack/react-query';

import { ErrorResponse } from 'apis/common/types';
import { deleteNotice } from 'apis/notice/NoticeApis';
import { DeleteNoticeReq } from 'apis/notice/types';

export const useDeleteNoticeMutation = () => {
  return useMutation<void, ErrorResponse, DeleteNoticeReq>({
    mutationFn: (data) => deleteNotice(data),
  });
};
