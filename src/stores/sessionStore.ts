import { create } from 'zustand';

interface SessionState {
  selectedIndexes: string[];
  setSelectedIndexes: (value: string[]) => void;
  page: number;
  setPage: (value: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedIndexes: [],
  setSelectedIndexes: (value: string[]) => set({ selectedIndexes: value }),
  page: 1,
  setPage: (value: number) => set({ page: value }),
}));
