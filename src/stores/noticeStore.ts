import { create } from 'zustand';

interface NoticeState {
  isAddNoticeComplete: boolean;
  setIsAddNoticeComplete: (value: boolean) => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  isAddNoticeComplete: false,
  setIsAddNoticeComplete: (value: boolean) =>
    set({ isAddNoticeComplete: value }),
}));
