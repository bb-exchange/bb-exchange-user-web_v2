"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import cookieStorage from "@/shared/lib/cookie-storage";

type ThemeInitialState = {
  theme: "light" | "dark";
};

type ThemeActions = {
  updateTheme: (data: ThemeInitialState["theme"]) => void;
};

const themeInitialState: ThemeInitialState = {
  theme: "dark",
};

export const themeStore = create(
  persist<ThemeInitialState & ThemeActions>(
    (set) => ({
      ...themeInitialState,
      updateTheme: (data: ThemeInitialState["theme"]) => set({ theme: data }),
    }),
    {
      name: "bibeop-theme",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
