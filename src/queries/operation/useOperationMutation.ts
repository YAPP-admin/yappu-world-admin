import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useSettingLinkStore } from '@stores/SettingLinkStore';
import { ErrorResponse } from 'apis/common/types';
import { putOperationList } from 'apis/operation/OperationApis';
import { OperationEditReq } from 'apis/operation/types';

export const useOperationMutation = () => {
  const queryClient = useQueryClient();
  const setIsEditPopupOpen = useSettingLinkStore(
    (state) => state.setIsEditPopupOpen,
  );
  const setIsEditCompletePopupOpen = useSettingLinkStore(
    (state) => state.setIsEditCompletePopupOpen,
  );
  return useMutation<void, AxiosError<ErrorResponse>, OperationEditReq>({
    mutationFn: (data) => putOperationList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['link'] });
      setIsEditPopupOpen(false);
      setIsEditCompletePopupOpen(true);
    },
    onError: (err) => {
      console.error('link patch :', err);
    },
  });
};
