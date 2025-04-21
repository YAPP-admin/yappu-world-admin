import { create } from 'zustand';

import { Version } from '../apis/operation/types';

interface SupportVersionState {
  isEditPopupOpen: boolean;
  setIsEditPopupOpen: (value: boolean) => void;
  isEditCompletePopupOpen: boolean;
  setIsEditCompletePopupOpen: (value: boolean) => void;
  selectedVersionInfo: Version | null;
  setSelectedVersionInfo: (value: Version) => void;
}

export const useSupportVersionStore = create<SupportVersionState>((set) => ({
  isEditPopupOpen: false,
  setIsEditPopupOpen: (value: boolean) => set({ isEditPopupOpen: value }),

  isEditCompletePopupOpen: false,
  setIsEditCompletePopupOpen: (value: boolean) =>
    set({ isEditCompletePopupOpen: value }),
  selectedVersionInfo: null,
  setSelectedVersionInfo: (value: Version) =>
    set({ selectedVersionInfo: value }),
}));
