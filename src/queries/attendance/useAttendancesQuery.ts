import { useQuery } from '@tanstack/react-query';
import { getAttendances } from 'apis/attendance/AttendanceApis';

export const useAttendancesQuery = () => {
  return useQuery({
    queryKey: ['attendances'],
    queryFn: () => getAttendances(),
  });
};
