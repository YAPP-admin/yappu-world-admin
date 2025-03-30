import { create } from 'zustand';

import { UserRole } from 'apis/user/types';

interface MemberCodeState {
  code: string;
  onChangeCode: (value: string) => void;
  role: UserRole | null;
  onChangeRole: (value: UserRole | null) => void;
  editPopupOpen: boolean;
  handleEditPopup: () => void;
  confirmPopupOpen: boolean;
  handleConfirmPopup: () => void;
}

export const useMemberCodeStore = create<MemberCodeState>((set) => ({
  code: '',
  onChangeCode: (value) => set({ code: value }),
  role: null,
  onChangeRole: (value) => set({ role: value }),
  editPopupOpen: false,
  handleEditPopup: () =>
    set((state) => ({ editPopupOpen: !state.editPopupOpen })),
  confirmPopupOpen: false,
  handleConfirmPopup: () =>
    set((state) => ({ confirmPopupOpen: !state.confirmPopupOpen })),
}));
