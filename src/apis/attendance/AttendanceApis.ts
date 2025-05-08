import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse } from 'apis/common/types';

import { AttendancesRes } from './types';

export const getAttendances = () => {
  return axiosInstance.get<ApiResponse<AttendancesRes>>(
    '/admin/v1/attendances',
  );
};
