import { create } from 'zustand';

import { SessionRes } from 'apis/session/types';

interface NoticeState {
  isAddNoticeComplete: boolean;
  setIsAddNoticeComplete: (value: boolean) => void;
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  isEditPopup: boolean;
  setIsEditPopup: (value: boolean) => void;
  isDeletePopup: boolean;
  setIsDeletePopup: (value: boolean) => void;
  isDeleteCompletePopup: boolean;
  setIsDeleteCompletePopup: (value: boolean) => void;
  page: number;
  setPage: (value: number) => void;
  selectSessionPopupOpen: boolean;
  setSelectSessionPopupOpen: (value: boolean) => void;
  selectedSession: SessionRes | null;
  setSelectedSession: (value: SessionRes | null) => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  isAddNoticeComplete: false,
  setIsAddNoticeComplete: (value: boolean) =>
    set({ isAddNoticeComplete: value }),
  selectedIndexes: [],
  setSelectedIndexes: (value: string[]) => set({ selectedIndexes: value }),
  isEditPopup: false,
  setIsEditPopup: (value: boolean) => set({ isEditPopup: value }),
  isDeletePopup: false,
  setIsDeletePopup: (value: boolean) => set({ isDeletePopup: value }),
  isDeleteCompletePopup: false,
  setIsDeleteCompletePopup: (value: boolean) =>
    set({ isDeleteCompletePopup: value }),
  page: 1,
  setPage: (value: number) => set({ page: value }),
  selectSessionPopupOpen: false,
  setSelectSessionPopupOpen: (value: boolean) =>
    set({ selectSessionPopupOpen: value }),
  selectedSession: null,
  setSelectedSession: (value: SessionRes | null) =>
    set({ selectedSession: value }),
}));
