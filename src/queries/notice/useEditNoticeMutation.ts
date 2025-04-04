import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ErrorResponse } from 'apis/common/types';
import { putNotice } from 'apis/notice/NoticeApis';
import { EditNoticeReq } from 'apis/notice/types';

export const useEditNoticeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<void, ErrorResponse, EditNoticeReq>({
    mutationFn: (data) => putNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice-list'] });
      navigate('/admin/notices');
    },
  });
};
