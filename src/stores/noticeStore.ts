import { create } from 'zustand';

interface NoticeState {
  isAddNoticeComplete: boolean;
  setIsAddNoticeComplete: (value: boolean) => void;
  selectedIndexes: number[];
  setSelectedIndexes: (value: number[]) => void;
  isDeletePopup: boolean;
  setIsDeletePopup: (value: boolean) => void;
  isDeleteCompletePopup: boolean;
  setIsDeleteCompletePopup: (value: boolean) => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  isAddNoticeComplete: false,
  setIsAddNoticeComplete: (value: boolean) =>
    set({ isAddNoticeComplete: value }),
  selectedIndexes: [],
  setSelectedIndexes: (value: number[]) => set({ selectedIndexes: value }),
  isDeletePopup: false,
  setIsDeletePopup: (value: boolean) => set({ isDeletePopup: value }),
  isDeleteCompletePopup: false,
  setIsDeleteCompletePopup: (value: boolean) =>
    set({ isDeleteCompletePopup: value }),
}));
