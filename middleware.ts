import { NextRequest, NextResponse, userAgent } from "next/server";

// Set pathname where middleware will be executed
export const config = {
  matcher: "/",
};

export function middleware({ headers, url }: NextRequest) {
  // Parse user agent
  const { device } = userAgent({ headers });

  // Check the viewport
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  console.log("🚀 ~ file: middleware.ts:14 ~ middleware ~ viewport:", viewport);

  // Update the expected url
  // req.nextUrl.pathname = `_viewport/${viewport}`;
  // req.nextUrl.pathname = `/${viewport}`;

  // Return rewrited response
  // return NextResponse.rewrite(req.nextUrl);
  // return NextResponse.redirect(req.nextUrl);
  return NextResponse.redirect(new URL(`/${viewport}`, url));
}
