import { create } from 'zustand';

interface ApplicationState {
  selectedIndexes: number[];
  setSelectedIndexes: (value: number[]) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  selectedIndexes: [],
  setSelectedIndexes: (value: number[]) => set({ selectedIndexes: value }),
}));
