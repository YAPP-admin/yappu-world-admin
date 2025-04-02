import { create } from 'zustand';

interface ApplicationState {
  selectedIndexes: number[];
  setSelectedIndexes: (value: number[]) => void;
  isDetailPopup: boolean;
  setIsDetailPopup: (value: boolean) => void;
  selectedId: string;
  setSelectedId: (value: string) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  selectedIndexes: [],
  setSelectedIndexes: (value: number[]) => set({ selectedIndexes: value }),
  isDetailPopup: false,
  setIsDetailPopup: (value: boolean) => set({ isDetailPopup: value }),
  selectedId: '',
  setSelectedId: (value: string) => set({ selectedId: value }),
}));
