import { create } from 'zustand';

import { OperationListInfo } from 'apis/operation/types';

interface SettingLink {
  selectedLinkInfo: OperationListInfo;
  setSelectedLinkInfo: (value: OperationListInfo) => void;
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
  isEditPopupOpen: false,
  setIsEditPopupOpen: (value: boolean) => set({ isEditPopupOpen: value }),

  isEditCompletePopupOpen: false,
  setIsEditCompletePopupOpen: (value: boolean) =>
    set({ isEditCompletePopupOpen: value }),
}));
