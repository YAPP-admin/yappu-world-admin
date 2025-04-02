import { create } from 'zustand';

import { ApplicationListRes } from 'apis/auth/types';

interface ApplicationState {
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  isDetailPopup: boolean;
  setIsDetailPopup: (value: boolean) => void;
  selectedList: ApplicationListRes | null;
  setSelectedList: (value: ApplicationListRes | null) => void;
  isApprovePopup: boolean;
  setIsApprovePopup: (value: boolean) => void;
  isApproveConfirmPopup: boolean;
  setIsApproveConfirmPopup: (value: boolean) => void;
  isApproveCompletePopup: boolean;
  setIsApproveCompletePopup: (value: boolean) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  selectedIndexes: [],
  setSelectedIndexes: (value: string[]) => set({ selectedIndexes: value }),
  isDetailPopup: false,
  setIsDetailPopup: (value: boolean) => set({ isDetailPopup: value }),
  selectedList: null,
  setSelectedList: (value: ApplicationListRes | null) =>
    set({ selectedList: value }),
  isApprovePopup: false,
  setIsApprovePopup: (value: boolean) => set({ isApprovePopup: value }),
  isApproveConfirmPopup: false,
  setIsApproveConfirmPopup: (value: boolean) =>
    set({ isApproveConfirmPopup: value }),
  isApproveCompletePopup: false,
  setIsApproveCompletePopup: (value: boolean) =>
    set({ isApproveCompletePopup: value }),
}));
