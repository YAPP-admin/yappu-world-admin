import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse } from 'apis/common/types';

import { AttendancesRes, EditAttendanceReq } from './types';

export const getAttendances = () => {
  return axiosInstance.get<ApiResponse<AttendancesRes>>(
    '/admin/v1/attendances',
  );
};

export const putAttendances = (data: EditAttendanceReq): Promise<void> => {
  return axiosInstance.put(`/admin/v1/attendances`, data);
};
