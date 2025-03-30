import { create } from 'zustand';

import { OperationListInfo } from 'apis/operation/types';

interface SettingLink {
  selectedLinkInfo: OperationListInfo;
  setSelectedLinkInfo: (value: OperationListInfo) => void;
  isDeletePopupOpen: boolean;
  setIsDeletePopupOpen: () => void;
  isEditPopupOpen: boolean;
  setIsEditPopupOpen: (value: boolean) => void;
  isEditCompletePopupOpen: boolean;
  setIsEditCompletePopupOpen: (value: boolean) => void;
}

export const useSettingLinkStore = create<SettingLink>((set) => ({
  selectedLinkInfo: {
    id: '',
    label: '',
    value: '',
  },
  setSelectedLinkInfo: (value) => set({ selectedLinkInfo: value }),
  isDeletePopupOpen: false,
  setIsDeletePopupOpen: () =>
    set((state) => ({ isDeletePopupOpen: !state.isDeletePopupOpen })),
  isEditPopupOpen: false,
  setIsEditPopupOpen: (value: boolean) => set({ isEditPopupOpen: value }),

  isEditCompletePopupOpen: false,
  setIsEditCompletePopupOpen: (value: boolean) =>
    set({ isEditCompletePopupOpen: value }),
}));
