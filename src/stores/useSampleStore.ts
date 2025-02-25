import { create } from 'zustand';

interface SampleStore {
  count: number;
  setIncreaseCounts: () => void;
  setResetCounts: () => void;
  setUpdateCounts: (newCount: number) => void;
}

const useSampleStore = create<SampleStore>((set) => ({
  count: 0,
  setIncreaseCounts: () => set((state) => ({ count: state.count + 1 })),
  setResetCounts: () => set({ count: 0 }),
  setUpdateCounts: (newCount) => set({ count: newCount }),
}));

export default useSampleStore;
