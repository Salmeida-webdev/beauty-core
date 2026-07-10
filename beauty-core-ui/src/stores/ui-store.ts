import { create } from "zustand";

type UiStore = {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  closeMobileSidebar: () => void;
  resetUi: () => void;
};

const initialState = {
  sidebarOpen: true,
  mobileSidebarOpen: false,
};

export const useUiStore = create<UiStore>((set) => ({
  ...initialState,

  setSidebarOpen: (sidebarOpen) => {
    set({ sidebarOpen });
  },

  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },

  setMobileSidebarOpen: (mobileSidebarOpen) => {
    set({ mobileSidebarOpen });
  },

  closeMobileSidebar: () => {
    set({ mobileSidebarOpen: false });
  },

  resetUi: () => {
    set(initialState);
  },
}));
