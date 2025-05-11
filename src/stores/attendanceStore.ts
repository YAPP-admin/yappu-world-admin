import { create } from 'zustand';

import {
  AttendanceStatusValueType,
  EditAttendanceTarget,
} from 'apis/attendance/types';

interface AttendanceStore {
  editedMap: Record<string, Record<string, string>>;
  updateStatus: (sessionId: string, userId: string, status: string) => void;
  bulkUpdateSession: (
    sessionId: string,
    userIds: string[],
    status: string,
  ) => void;
  resetEditedMap: () => void;
  getTargets: () => EditAttendanceTarget[];
  editPopupOpen: boolean;
  setEditPopupOpen: (value: boolean) => void;
  completeEditPopupOpen: boolean;
  setCompleteEditPopupOpen: (value: boolean) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  editedMap: {},
  updateStatus: (sessionId, userId, status) => {
    set((state) => {
      return {
        editedMap: {
          ...state.editedMap,
          [sessionId]: {
            ...state.editedMap[sessionId],
            [userId]: status,
          },
        },
      };
    });
  },
  bulkUpdateSession: (sessionId, userIds, status) => {
    set((state) => {
      const updates: Record<string, string> = {};
      userIds.forEach((userId) => {
        updates[userId] = status;
      });

      return {
        editedMap: {
          ...state.editedMap,
          [sessionId]: updates,
        },
      };
    });
  },
  resetEditedMap: () => set({ editedMap: {} }),
  getTargets: () => {
    const result: EditAttendanceTarget[] = [];
    const map = get().editedMap;
    for (const sessionId in map) {
      for (const userId in map[sessionId]) {
        result.push({
          sessionId,
          userId,
          attendanceStatus: map[sessionId][userId] as AttendanceStatusValueType,
        });
      }
    }
    return result;
  },
  editPopupOpen: false,
  setEditPopupOpen: (value: boolean) => set({ editPopupOpen: value }),
  completeEditPopupOpen: false,
  setCompleteEditPopupOpen: (value: boolean) =>
    set({ completeEditPopupOpen: value }),
}));
