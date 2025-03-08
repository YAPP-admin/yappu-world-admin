import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if ([403].includes(status)) {
      const originConfig = config;
      try {
        return axiosInstance.request(originConfig);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          window.alert('axios error');
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
