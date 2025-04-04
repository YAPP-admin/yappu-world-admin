import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginRes } from 'apis/auth/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (data: LoginRes) => void;
  resetToken: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setToken: (token) =>
        set({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        }),
      resetToken: () =>
        set({
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'userAuthStorage',
    },
  ),
);
