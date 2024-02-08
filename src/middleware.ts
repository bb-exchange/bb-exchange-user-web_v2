import { NextRequest, NextResponse, userAgent } from "next/server";

// Set pathname where middleware will be executed
export const config = {
  matcher: "/",
};

export function middleware({ nextUrl, headers, url }: NextRequest) {
  // Parse user agent
  const { device } = userAgent({ headers });

  // Check the viewport
  // const viewport = device.type === "mobile" ? "mobile" : "desktop";

  if (device.type === "mobile" && nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/serviceIntroduction", url));
}
