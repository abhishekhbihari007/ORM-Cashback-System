"use client";

import { create } from "zustand";

type UIState = {
  mobileNavOpen: boolean;
  selectedCountry: string;
  setCountry: (country: string) => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  selectedCountry: "India",
  setCountry: (selectedCountry) => set({ selectedCountry }),
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),
}));

