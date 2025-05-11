import { useMutation } from '@tanstack/react-query';

import { putAttendances } from 'apis/attendance/AttendanceApis';
import { EditAttendanceReq } from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';

export const useEditAttendanceMutation = () => {
  return useMutation<void, ErrorResponse, EditAttendanceReq>({
    mutationFn: (data) => putAttendances(data),
  });
};
