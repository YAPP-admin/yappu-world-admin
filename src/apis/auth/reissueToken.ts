import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { commonToastOption } from '@constants/toastOption';
import { useAuthStore } from '@stores/authStore';
import { ErrorResponse } from 'apis/common/types';

import { postReissueToken } from './AuthApis';
import { ReissueTokenReq } from './types';

export const logoutAndReset = (message?: string) => {
  useAuthStore.persist.clearStorage();
  useAuthStore.getState().resetUser();
  toast.error(`${message}\n다시 로그인 해주세요.`, commonToastOption);
};

export const reissueToken = async () => {
  const { accessToken, refreshToken, setToken } = useAuthStore.getState();

  const req: ReissueTokenReq = {
    accessToken: accessToken ?? '',
    refreshToken: refreshToken ?? '',
  };

  try {
    const response = await postReissueToken(req);
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data.data;

    setToken({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    return newAccessToken;
  } catch (error) {
    if (isAxiosError<ErrorResponse>(error)) {
      const { errorCode, message } = error?.response?.data || {};
      const status = error?.response?.status;

      if (status === 401 && errorCode === 'TKN_0002') {
        logoutAndReset(message);
      }

      throw error;
    }
  }
};
