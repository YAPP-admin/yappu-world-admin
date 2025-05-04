import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { useMemberCodeStore } from '@stores/memberCodeStore';
import { patchMemberCode } from 'apis/auth/AuthApis';
import { MemberCodeReq } from 'apis/auth/types';
import { ApiResponse, ErrorResponse } from 'apis/common/types';

export const useMemberCodeMutation = () => {
  const queryClient = useQueryClient();
  const handleConfirmPopup = useMemberCodeStore(
    (state) => state.handleConfirmPopup,
  );
  const handleEditPopup = useMemberCodeStore((state) => state.handleEditPopup);

  return useMutation<
    AxiosResponse<ApiResponse<null>>,
    AxiosError<ErrorResponse>,
    MemberCodeReq
  >({
    mutationFn: (data) => patchMemberCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-code-list'] });
      handleConfirmPopup(false);
      handleEditPopup(false);
    },
  });
};
