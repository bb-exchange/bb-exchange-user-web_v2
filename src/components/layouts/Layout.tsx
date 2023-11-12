import { useCookies } from "react-cookie";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Navbar from "./Navbar";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from "../common/commonFooter";
import { isLoginState, useSsrCompletedState, userNameState } from ".src/recoil";

interface Iprops {
  pageProps: any;
  children: ReactNode;
}

const Layout = ({ pageProps, children }: Iprops) => {
  const [cookie] = useCookies(["authKey", "accessToken", "refreshToken"]);
  const setSsrCompleted = useSsrCompletedState();

  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

  useEffect(() => setSsrCompleted, [setSsrCompleted]);

  useEffect(() => {
    if (!cookie.accessToken && !cookie.refreshToken) {
      setIsLoginState(false);
      setUserNameState(null);
    }
  }, [
    cookie.accessToken,
    cookie.refreshToken,
    setIsLoginState,
    setUserNameState,
  ]);

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
