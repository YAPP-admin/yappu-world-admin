import { create } from 'zustand';

import { NoticeRes } from 'apis/notice/types';

interface SessionState {
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  page: number;
  setPage: (value: number) => void;
  editCompletePopup: boolean;
  setEditCompletePopup: (value: boolean) => void;
  addCompletePopup: boolean;
  setAddCompletePopup: (value: boolean) => void;
  isDeletePopup: boolean;
  setIsDeletePopup: (value: boolean) => void;
  isDeleteCompletePopup: boolean;
  setIsDeleteCompletePopup: (value: boolean) => void;
  sessionTargetPopup: boolean;
  setSessionTargetPopup: (value: boolean) => void;
  relatedNoticePopup: boolean;
  setReleatedNoticePopup: (value: boolean) => void;
  selectedNotices: NoticeRes[];
  setSelectedNoticds: (value: NoticeRes[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedIndexes: [],
  setSelectedIndexes: (value: string[]) => set({ selectedIndexes: value }),
  page: 1,
  setPage: (value: number) => set({ page: value }),
  editCompletePopup: false,
  setEditCompletePopup: (value: boolean) => set({ editCompletePopup: value }),
  addCompletePopup: false,
  setAddCompletePopup: (value: boolean) => set({ addCompletePopup: value }),
  isDeletePopup: false,
  setIsDeletePopup: (value: boolean) => set({ isDeletePopup: value }),
  isDeleteCompletePopup: false,
  setIsDeleteCompletePopup: (value: boolean) =>
    set({ isDeleteCompletePopup: value }),
  sessionTargetPopup: false,
  setSessionTargetPopup: (value: boolean) => set({ sessionTargetPopup: value }),
  relatedNoticePopup: false,
  setReleatedNoticePopup: (value: boolean) =>
    set({ relatedNoticePopup: value }),
  selectedNotices: [],
  setSelectedNoticds: (value: NoticeRes[]) => set({ selectedNotices: value }),
}));
