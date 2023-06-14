import { ReactNode } from "react";
import Navbar from "./Navbar";
import CommonHeader from "../common/commonHeader";
import CommonFooter from "../common/commonFooter";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  return (
    <>
      {pageProps.navBar && <Navbar />}
      {pageProps.commonLayout && <CommonHeader />}

      <div>{children}</div>

      {pageProps.commonLayout && <CommonFooter />}
    </>
  );
};

export default Layout;
