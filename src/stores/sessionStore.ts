import { create } from 'zustand';

interface SessionState {
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  page: number;
  setPage: (value: number) => void;
  editCompletePopup: boolean;
  setEditCompletePopup: (value: boolean) => void;
  addCompletePopup: boolean;
  setAddCompletePopup: (value: boolean) => void;
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
}));
