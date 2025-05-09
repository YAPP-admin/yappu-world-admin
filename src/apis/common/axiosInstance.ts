import axios, { isAxiosError } from 'axios';

import { useAuthStore } from '@stores/authStore';
import { logoutAndReset, reissueToken } from 'apis/auth/reissueToken';
import { showErrorToast } from 'types/showErrorToast';

import { ErrorResponse } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  const excludeUrls = ['/admin/v1/auth/login', '/admin/v1/auth/reissue-token'];

  if (accessToken && !excludeUrls.includes(config.url ?? '')) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('error ', error);
    if (!error.response) {
      return Promise.reject(error);
    }
    const { response, config: originalRequest } = error;
    const errorCode = response.data?.errorCode;
    const status = response.status;
    const message = response.data?.message;

    if (
      originalRequest.url?.includes('/auth/reissue') ||
      originalRequest._retry
    ) {
      console.warn('⛔️ 재발급 요청 또는 이미 재시도한 요청입니다.');
      return Promise.reject(error);
    }

    // ✅ 비정상 토큰 → 즉시 로그아웃
    if (status === 401 && errorCode === 'TKN_0002') {
      logoutAndReset(message ?? '비정상 토큰입니다.');
      return Promise.reject(error);
    }

    if (status === 401 && errorCode === 'TKN_0001') {
      originalRequest._retry = true;

      try {
        const newAccessToken = await reissueToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // 재요청
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          return Promise.reject(error);
        }
      }
    }

    if (
      [500, 400].includes(status) &&
      ['COM_0001', 'COM_0002'].includes(errorCode)
    ) {
      showErrorToast(response.data.message);
      return;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
