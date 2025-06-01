import { useQuery } from '@tanstack/react-query';

import { getAttendanceCode } from 'apis/attendance/AttendanceApis';

export const useAttendanceCodeQuery = () => {
  return useQuery({
    queryKey: ['attendance-code'],
    queryFn: () => getAttendanceCode(),
    select: (data) => {
      return data.data.data;
    },
  });
};
