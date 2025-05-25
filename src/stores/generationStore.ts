import { create } from 'zustand';

import { GenerationListRes } from 'apis/operation/types';

interface GenerationState {
  selectedGeneration: GenerationListRes | null;
  setSelectedGeneration: (value: GenerationListRes | null) => void;
  isMenuOpen: boolean;
  handleMenuOpen: (value: boolean) => void;
  isAddPopupOpen: boolean;
  handleAddPopupOpen: (value: boolean) => void;
  isAddCompletePopupOpen: boolean;
  handleAddCompletePopupOpen: (value: boolean) => void;
  page: number;
  setPage: (value: number) => void;
  selectedIndexes: number[];
  setSelectedIndexes: (value: number[]) => void;
  handleDeletePopup: boolean;
  setHandleDeletePopup: (value: boolean) => void;
  deleteCompletePopup: boolean;
  setDeleteCompletePopup: (value: boolean) => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  selectedGeneration: null,
  setSelectedGeneration: (value: GenerationListRes | null) =>
    set({ selectedGeneration: value }),
  isMenuOpen: false,
  handleMenuOpen: (value: boolean) => set({ isMenuOpen: value }),
  isAddPopupOpen: false,
  handleAddPopupOpen: (value: boolean) => set({ isAddPopupOpen: value }),
  isAddCompletePopupOpen: false,
  handleAddCompletePopupOpen: (value: boolean) =>
    set({ isAddCompletePopupOpen: value }),
  page: 1,
  setPage: (value: number) => set({ page: value }),
  selectedIndexes: [],
  setSelectedIndexes: (value: number[]) => set({ selectedIndexes: value }),
  handleDeletePopup: false,
  setHandleDeletePopup: (value: boolean) => set({ handleDeletePopup: value }),
  deleteCompletePopup: false,
  setDeleteCompletePopup: (value: boolean) =>
    set({ deleteCompletePopup: value }),
}));
