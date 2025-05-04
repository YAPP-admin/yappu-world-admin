import { create } from 'zustand';

import { MemberCodeInfo } from 'apis/auth/types';

interface MemberCodeState {
  selectedCode: MemberCodeInfo | null;
  setSelectedCode: (value: MemberCodeInfo | null) => void;
  editPopupOpen: boolean;
  handleEditPopup: (value: boolean) => void;
  confirmPopupOpen: boolean;
  handleConfirmPopup: (value: boolean) => void;
}

export const useMemberCodeStore = create<MemberCodeState>((set) => ({
  selectedCode: null,
  setSelectedCode: (value) => set({ selectedCode: value }),
  editPopupOpen: false,
  handleEditPopup: (value) => set({ editPopupOpen: value }),
  confirmPopupOpen: false,
  handleConfirmPopup: (value) => set({ confirmPopupOpen: value }),
}));
