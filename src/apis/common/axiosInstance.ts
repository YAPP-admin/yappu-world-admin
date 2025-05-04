import axios from 'axios';
import { toast } from 'react-toastify';

import { commonToastOption } from '@constants/toastOption';
import { useAuthStore } from '@stores/authStore';
import { postReissueToken } from 'apis/auth/AuthApis';
import { showErrorToast } from 'types/showErrorToast';

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
    const { response, config } = error;

    if (
      [500, 400].includes(response.status) &&
      ['COM_0001', 'COM_0002'].includes(response.data.errorCode)
    ) {
      showErrorToast(response.data.message);
      return;
    } else if (
      response.status === 401 &&
      ['TKN_0001', 'TKN_0002'].includes(response.data.errorCode)
    ) {
      const originalRequest = config;
      try {
        const { accessToken, refreshToken, setToken } = useAuthStore.getState();
        if (!accessToken || !refreshToken)
          throw new Error('token is not exist');

        const { data } = await postReissueToken({ accessToken, refreshToken });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        setToken({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        await useAuthStore.persist.clearStorage();
        useAuthStore.getState().resetUser();
        toast.error(
          `${response.data.message}\n다시 로그인 해주세요.`,
          commonToastOption,
        );
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
