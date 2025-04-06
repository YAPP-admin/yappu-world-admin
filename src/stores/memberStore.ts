import { create } from 'zustand';

import { UserDetailRes } from 'apis/user/types';

interface MemberState {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => void;
  userDetailInfo: UserDetailRes | null;
  setUserDetailInfo: (data: UserDetailRes) => void;
  detailPopupOpen: boolean;
  setDetailPopupOpen: () => void;
  page: number;
  setPage: (value: number) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  selectedUserId: null,
  userDetailInfo: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setUserDetailInfo: (userData) => set({ userDetailInfo: userData }),
  detailPopupOpen: false,
  setDetailPopupOpen: () =>
    set((state) => ({ detailPopupOpen: !state.detailPopupOpen })),
  page: 1,
  setPage: (value: number) => set({ page: value }),
}));
