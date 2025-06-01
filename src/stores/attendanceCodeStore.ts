import { create } from 'zustand';

interface AttendanceCodeState {
  editPopupOpen: boolean;
  handleEditPopup: (value: boolean) => void;
  confirmPopupOpen: boolean;
  handleConfirmPopup: (value: boolean) => void;
  refreshPopup: boolean;
  handleRefreshPopup: (value: boolean) => void;
}

export const useAttendanceCodeStore = create<AttendanceCodeState>((set) => ({
  editPopupOpen: false,
  handleEditPopup: (value) => set({ editPopupOpen: value }),
  confirmPopupOpen: false,
  handleConfirmPopup: (value) => set({ confirmPopupOpen: value }),
  refreshPopup: false,
  handleRefreshPopup: (value) => set({ refreshPopup: value }),
}));
