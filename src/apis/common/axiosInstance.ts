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
    console.log('error ', error);
    if (!error.response) {
      return Promise.reject(error);
    }
    const { response } = error;

    if ([500].includes(response.status)) {
      console.error(`[공통 에러] ${response.status} 에러 발생`);
      return Promise.reject(error);
    } else if (
      response.status === 401 &&
      response.data.errorCode === 'TKN_0001'
    ) {
      await useAuthStore.persist.clearStorage();
      useAuthStore.getState().resetUser();
      window.alert('토큰이 만료됐습니다. 다시 로그인 해주세요.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
