import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'react-router-dom';

import { deleteAttendanceCode } from 'apis/attendance/AttendanceApis';

export const useDeleteAttendanceCodeMutation = () => {
  return useMutation<void, ErrorResponse>({
    mutationFn: () => deleteAttendanceCode(),
  });
};
