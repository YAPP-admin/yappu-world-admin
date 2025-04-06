import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginRes } from 'apis/auth/types';
import { UserProfileRes } from 'apis/user/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (data: LoginRes) => void;
  resetUser: () => void;
  userProfile: UserProfileRes | null;
  setUserProfile: (value: UserProfileRes) => void;
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
      resetUser: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userProfile: null,
        }),
      userProfile: null,
      setUserProfile: (value) => {
        set({ userProfile: value });
      },
    }),
    {
      name: 'userAuthStorage',
    },
  ),
);
