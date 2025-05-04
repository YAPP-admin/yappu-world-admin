import { useMutation } from '@tanstack/react-query';

import { deleteMemberCode } from 'apis/auth/AuthApis';
import { DeleteMemberCodeReq } from 'apis/auth/types';
import { ErrorResponse } from 'apis/common/types';

export const useDeleteMemberCodeMutation = () => {
  return useMutation<void, ErrorResponse, DeleteMemberCodeReq>({
    mutationFn: (data) => deleteMemberCode(data),
  });
};
