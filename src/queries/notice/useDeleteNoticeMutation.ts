import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useNoticeStore } from '@stores/noticeStore';
import { ErrorResponse } from 'apis/common/types';
import { deleteNotice } from 'apis/notice/NoticeApis';
import { DeleteNoticeReq } from 'apis/notice/types';

export const useDeleteNoticeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsDeleteCompletePopup = useNoticeStore(
    (state) => state.setIsDeleteCompletePopup,
  );
  const setSelectedIndexes = useNoticeStore(
    (state) => state.setSelectedIndexes,
  );
  return useMutation<void, ErrorResponse, DeleteNoticeReq>({
    mutationFn: (data) => deleteNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice-list'] });
      navigate('/admin/notices');
      setIsDeleteCompletePopup(true);
      setSelectedIndexes([]);
    },
  });
};
