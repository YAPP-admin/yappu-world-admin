import { UserDetailRes } from 'apis/user/types';
import { create } from 'zustand';

interface MemberState {
  selectedUserId: number | null;
  setSelectedUserId: (userId: number) => void;
  userDetailInfo: UserDetailRes | null;
  setUserDetailInfo: (data: UserDetailRes) => void;
  detailPopupOpen: boolean;
  setDetailPopupOpen: () => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  selectedUserId: null,
  userDetailInfo: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setUserDetailInfo: (userData) => set({ userDetailInfo: userData }),
  detailPopupOpen: false,
  setDetailPopupOpen: () =>
    set((state) => ({ detailPopupOpen: !state.detailPopupOpen })),
}));
