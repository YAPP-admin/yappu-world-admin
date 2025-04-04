import axios from 'axios';

import { useAuthStore } from '@stores/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken && config.url !== '/admin/v1/auth/login') {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const { config, response } = error;
    const { status } = response;
    const clearUserIdStorage = useAuthStore.persist.clearStorage;
    const resetToken = useAuthStore((state) => state.resetToken);

    console.log(response.data.errorCode);

    if ([500].includes(status)) {
      console.error(`[공통 에러] ${status} 에러 발생`);
      // 예: 500일 경우 사용자에게 알림
      return Promise.reject(error); // react-query에는 넘기지 않음
    } else if (
      [401].includes(status) &&
      response.data.errorCode === 'TKN_0001'
    ) {
      console.log('a');
      window.alert('토큰 만료');
      resetToken();
      clearUserIdStorage();
      return Promise.reject(error); // react-query에는 넘기지 않음

      const originConfig = config;
      try {
        return axiosInstance.request(originConfig);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          window.alert('axios error');
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
