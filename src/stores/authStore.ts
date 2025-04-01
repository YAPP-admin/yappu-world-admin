import { create } from 'zustand';

import { LoginRes } from 'apis/auth/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (data: LoginRes) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setToken: (token) =>
    set({ accessToken: token.accessToken, refreshToken: token.refreshToken }),
}));
