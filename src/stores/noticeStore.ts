import { create } from 'zustand';

interface NoticeState {
  isAddNoticeComplete: boolean;
  setIsAddNoticeComplete: (value: boolean) => void;
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  isDeletePopup: boolean;
  setIsDeletePopup: (value: boolean) => void;
  isDeleteCompletePopup: boolean;
  setIsDeleteCompletePopup: (value: boolean) => void;
  page: number;
  setPage: (value: number) => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  isAddNoticeComplete: false,
  setIsAddNoticeComplete: (value: boolean) =>
    set({ isAddNoticeComplete: value }),
  selectedIndexes: [],
  setSelectedIndexes: (value: string[]) => set({ selectedIndexes: value }),
  isDeletePopup: false,
  setIsDeletePopup: (value: boolean) => set({ isDeletePopup: value }),
  isDeleteCompletePopup: false,
  setIsDeleteCompletePopup: (value: boolean) =>
    set({ isDeleteCompletePopup: value }),
  page: 1,
  setPage: (value: number) => set({ page: value }),
}));
