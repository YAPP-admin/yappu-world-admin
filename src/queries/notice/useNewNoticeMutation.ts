import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useNoticeStore } from '@stores/noticeStore';
import { ErrorResponse } from 'apis/common/types';
import { postNewNotice } from 'apis/notice/NoticeApis';
import { BaseNoticeReq } from 'apis/notice/types';


export const useNewNoticeMutation = () => {
  const navigate = useNavigate();
  const setIsAddNoticeComplete = useNoticeStore(
    (state) => state.setIsAddNoticeComplete,
  );
  const queryClient = useQueryClient();
  return useMutation<void, ErrorResponse, BaseNoticeReq>({
    mutationFn: (data) => postNewNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice-list'] });
      navigate('/admin/notices');
      setIsAddNoticeComplete(true);
    },
  });
};
