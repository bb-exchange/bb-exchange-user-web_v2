import { useCookies } from "react-cookie";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import Navbar from "./Navbar";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from "../common/commonFooter";
import { isLoginState, userNameState } from ".src/recoil";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  const router = useRouter();
  const [cookie] = useCookies(["authKey", "accessToken", "refreshToken"]);

  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

  useEffect(() => {
    if (!cookie.accessToken && !cookie.refreshToken) {
      setIsLoginState(false);
      setUserNameState(null);
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
