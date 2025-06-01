import { useMutation } from '@tanstack/react-query';

import { putAttendanceCode } from 'apis/attendance/AttendanceApis';
import { EditAttendanceCodeReq } from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';

export const useEditAttendanceCodeMutation = () => {
  return useMutation<void, ErrorResponse, EditAttendanceCodeReq>({
    mutationFn: (data) => putAttendanceCode(data),
  });
};
