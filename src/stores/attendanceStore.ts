import { create } from 'zustand';

import {
  AttendanceStatusValueType,
  EditAttendanceReq,
  EditAttendanceTarget,
  EditLatePassTarget,
} from 'apis/attendance/types';

interface AttendanceStore {
  editedMap: Record<string, Record<string, string>>;
  updateStatus: (sessionId: string, userId: string, status: string) => void;
  bulkUpdateSession: (
    sessionId: string,
    userIds: string[],
    status: string,
  ) => void;
  latePassMap: Record<string, number>;
  updateLatePass: (userId: string, count: number) => void;
  getTargets: () => {
    generation: number;
    attendances: EditAttendanceTarget[];
    latePasses: EditLatePassTarget[];
  };
  resetEditedMap: () => void;

  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  editPopupOpen: boolean;
  setEditPopupOpen: (value: boolean) => void;
  completeEditPopupOpen: boolean;
  setCompleteEditPopupOpen: (value: boolean) => void;
  bundleEditPopupOpen: boolean;
  setBundleEditPopupOpen: (value: boolean) => void;
  bundleEditCompletePopupOpen: boolean;
  setBundleEditCompletePopupOpen: (value: boolean) => void;
  generation: number | null;
  setGeneration: (value: number) => void;
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

  latePassMap: {},
  updateLatePass: (userId, count) =>
    set((state) => ({
      latePassMap: {
        ...state.latePassMap,
        [userId]: count,
      },
    })),

  getTargets: () => {
    const attendaceResult: EditAttendanceTarget[] = [];
    const attendanceMap = get().editedMap;
    const latePassMap = get().latePassMap;

    for (const sessionId in attendanceMap) {
      for (const userId in attendanceMap[sessionId]) {
        attendaceResult.push({
          sessionId,
          userId,
          attendanceStatus: attendanceMap[sessionId][
            userId
          ] as AttendanceStatusValueType,
        });
      }
    }

    const latePasses = Object.entries(latePassMap).map(
      ([userId, latePassCount]) => ({
        userId,
        latePassCount,
      }),
    );

    return {
      attendances: attendaceResult,
      latePasses,
      generation: get().generation ?? 0,
    } as EditAttendanceReq;
  },

  resetEditedMap: () => set({ editedMap: {} }),

  isEdit: false,
  setIsEdit: (value: boolean) => set({ isEdit: value }),
  editPopupOpen: false,
  setEditPopupOpen: (value: boolean) => set({ editPopupOpen: value }),
  completeEditPopupOpen: false,
  setCompleteEditPopupOpen: (value: boolean) =>
    set({ completeEditPopupOpen: value }),
  bundleEditPopupOpen: false,
  setBundleEditPopupOpen: (value: boolean) =>
    set({ bundleEditPopupOpen: value }),
  bundleEditCompletePopupOpen: false,
  setBundleEditCompletePopupOpen: (value: boolean) =>
    set({ bundleEditCompletePopupOpen: value }),
  generation: null,
  setGeneration: (value: number) => set({ generation: value }),
}));
