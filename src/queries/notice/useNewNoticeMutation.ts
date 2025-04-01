import { useMutation } from '@tanstack/react-query';

import { ErrorResponse } from 'apis/common/types';
import { postNewNotice } from 'apis/notice/NoticeApis';
import { BaseNoticeReq } from 'apis/notice/types';

export const useNewNoticeMutation = () => {
  return useMutation<void, ErrorResponse, BaseNoticeReq>({
    mutationFn: (data) => postNewNotice(data),
  });
};
