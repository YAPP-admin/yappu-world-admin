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
}));
