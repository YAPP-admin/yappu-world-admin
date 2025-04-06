import { create } from 'zustand';

interface MemberState {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => void;
  detailPopupOpen: boolean;
  setDetailPopupOpen: () => void;
  page: number;
  setPage: (value: number) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  detailPopupOpen: false,
  setDetailPopupOpen: () =>
    set((state) => ({ detailPopupOpen: !state.detailPopupOpen })),
  page: 1,
  setPage: (value: number) => set({ page: value }),
}));
