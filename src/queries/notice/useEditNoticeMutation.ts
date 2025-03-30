import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'apis/common/types';
import { putNotice } from 'apis/notice/NoticeApis';
import { EditNoticeReq } from 'apis/notice/types';

export const useEditNoticeMutation = () => {
  return useMutation<void, ErrorResponse, EditNoticeReq>({
    mutationFn: (data) => putNotice(data),
  });
};
