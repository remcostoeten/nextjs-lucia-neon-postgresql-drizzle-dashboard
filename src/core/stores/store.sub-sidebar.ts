import { create } from "zustand";

type SubSidebarStore = {
  isOpen: boolean;
  toggle: () => void;
};

export const useSubSidebarStore = create<SubSidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
