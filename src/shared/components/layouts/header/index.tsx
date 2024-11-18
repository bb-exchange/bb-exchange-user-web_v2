"use client";

import Link from "next/link";

import "./header.scss";

import { Button } from "@/shared/components/ui/button";
import { themeStore } from "@/shared/stores/theme-store";

const URLS = ["/", "auth/signin", "mypage", "event", "point", "setting"];
export default function Header() {
  const theme = themeStore((state) => state);
  return (
    <header className="header">
      <Button
        color="indigo"
        onClick={() => theme.updateTheme(theme.theme === "dark" ? "light" : "dark")}
      >
        {theme.theme}
      </Button>
      {URLS.map((url) => {
        return (
          <Link href={url} key={url}>
            <Button variant="surface">go {url}</Button>
          </Link>
        );
      })}
    </header>
  );
}
