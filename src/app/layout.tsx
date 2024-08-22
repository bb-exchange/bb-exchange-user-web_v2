import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Theme } from "@radix-ui/themes";

import Footer from "@/shared/components/layouts/footer";
import Header from "@/shared/components/layouts/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Theme>
          <Header />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
