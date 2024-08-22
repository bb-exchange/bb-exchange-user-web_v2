import "./header.scss";

import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

const URLS = ["/", "login", "mypage", "event", "point", "setting"];
export default function Header() {
  return (
    <header className="header">
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
