import { ReactNode } from "react";
import Navbar from "./Navbar";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from "../common/commonFooter";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  return (
    <>
      {pageProps.navBar && <Navbar />}
      {pageProps.commonLayout && <CommonHeader commonSort={pageProps.commonSort} />}

      <div>{children}</div>

      {pageProps.commonLayout && <CommonFooter />}
    </>
  );
};

export default Layout;
