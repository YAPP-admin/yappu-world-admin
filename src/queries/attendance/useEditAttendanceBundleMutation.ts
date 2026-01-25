import { useMutation } from '@tanstack/react-query';

import { putSessionAttendancesBundle } from 'apis/attendance/AttendanceApis';
import { EditSessionAttendanceBundleReq } from 'apis/attendance/types';
import { ErrorResponse } from 'apis/common/types';

export const useEditAttendanceBundleMutation = () => {
  return useMutation<void, ErrorResponse, EditSessionAttendanceBundleReq>({
    mutationFn: (data) => putSessionAttendancesBundle(data),
  });
};
