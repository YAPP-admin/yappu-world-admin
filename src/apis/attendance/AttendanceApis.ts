import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse } from 'apis/common/types';

import {
  AttendanceCodeRes,
  AttendancesRes,
  EditAttendanceCodeReq,
  EditAttendanceReq,
} from './types';

export const getAttendances = () => {
  return axiosInstance.get<ApiResponse<AttendancesRes>>(
    '/admin/v1/attendances',
  );
};

export const putAttendances = (data: EditAttendanceReq): Promise<void> => {
  return axiosInstance.put(`/admin/v1/attendances`, data);
};

export const getAttendanceCode = () => {
  return axiosInstance.get<ApiResponse<AttendanceCodeRes>>(
    '/admin/v1/attendance-code',
  );
};

export const putAttendanceCode = (
  data: EditAttendanceCodeReq,
): Promise<void> => {
  return axiosInstance.put('/admin/v1/attendance-code', data);
};

export const deleteAttendanceCode = (): Promise<void> => {
  return axiosInstance.delete('/admin/v1/attendance-code');
};
