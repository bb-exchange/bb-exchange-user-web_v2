import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from "../common/commonFooter";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { signOut } from ".src/features/userSlice";
import { useRouter } from "next/router";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie] = useCookies(["authKey", "accessToken", "refreshToken"]);

  useEffect(() => {
    if (!cookie.accessToken && !cookie.refreshToken) {
      dispatch(signOut());
    }
  }, [router.pathname]);

  return (
    <>
      {pageProps.navBar && <Navbar />}
      {pageProps.commonLayout && (
        <CommonHeader commonSort={pageProps.commonSort} />
      )}

      <div>{children}</div>

      {pageProps.commonLayout && <CommonFooter />}
    </>
  );
};

export default Layout;
