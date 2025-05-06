import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { ErrorResponse } from 'apis/common/types';
import { postNewNotice } from 'apis/notice/NoticeApis';
import { BaseNoticeReq } from 'apis/notice/types';

export const useNewNoticeMutation = () => {
  return useMutation<AxiosResponse, ErrorResponse, BaseNoticeReq>({
    mutationFn: (data) => postNewNotice(data),
  });
};
