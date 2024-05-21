import CommonFooter from "../common/commonFooter";
import Navbar from "./Navbar";

import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

import CommonHeader from ".src/components/common/header/commonHeader";
import { isLoginState, userNameState, useSsrCompletedState } from ".src/recoil";
import { useSetRecoilState } from "recoil";

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
  }, [cookie.accessToken, cookie.refreshToken, setIsLoginState, setUserNameState]);

  return (
    <div
      style={{ height: "inherit", width: "inherit" }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e) => e.ctrlKey && e.code === "KeyC" && e.preventDefault()}
    >
      {pageProps.navBar && <Navbar />}
      {pageProps.commonLayout && <CommonHeader commonSort={pageProps.commonSort} />}

      <div>{children}</div>

      {pageProps.commonLayout && <CommonFooter />}
    </div>
  );
};

export default Layout;
