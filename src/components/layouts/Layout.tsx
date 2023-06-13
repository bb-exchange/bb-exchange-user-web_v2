import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import CommonHeader from "../common/commonHeader";
import CommonFooter from "../common/commonFooter";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  const { pathname } = useRouter();

  return (
    <>
      {pageProps.navBar && <Navbar />}
      {pageProps.commonLayout && <CommonHeader />}
      <main>{children}</main>
      {pageProps.commonLayout && <CommonFooter />}
    </>
  );
};

export default Layout;
