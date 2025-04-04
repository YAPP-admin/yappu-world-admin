import { create } from 'zustand';

import { MemberCodeInfo } from 'apis/auth/types';

interface MemberCodeState {
  selectedCode: MemberCodeInfo | null;
  setSelectedCode: (value: MemberCodeInfo | null) => void;
  editPopupOpen: boolean;
  handleEditPopup: () => void;
  confirmPopupOpen: boolean;
  handleConfirmPopup: () => void;
}

export const useMemberCodeStore = create<MemberCodeState>((set) => ({
  selectedCode: null,
  setSelectedCode: (value) => set({ selectedCode: value }),
  editPopupOpen: false,
  handleEditPopup: () =>
    set((state) => ({ editPopupOpen: !state.editPopupOpen })),
  confirmPopupOpen: false,
  handleConfirmPopup: () =>
    set((state) => ({ confirmPopupOpen: !state.confirmPopupOpen })),
}));
