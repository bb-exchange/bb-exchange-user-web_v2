"use client";

import { ReactNode, useEffect, useState } from "react";

import { ThemeProvider as NextThemeProvider } from "next-themes";

import { themeStore } from "../stores/theme-store";
import { Theme } from "@radix-ui/themes";

export default function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const theme = themeStore((state) => state.theme);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <NextThemeProvider attribute="class">
      <Theme appearance={theme} accentColor="purple">
        {children}
      </Theme>
    </NextThemeProvider>
  );
}
