import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <>
      {pathname !== "/auth" && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
