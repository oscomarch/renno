import { create } from "zustand";

type AppState = {
  mobileNavOpen: boolean;
  setMobileNavOpen: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (value) => set({ mobileNavOpen: value })
}));
