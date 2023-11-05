import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";

import { isLoginState, userNameState } from ".src/recoil";

export const useSignOut = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);

  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

  const logOut = () => {
    setIsLoginState(false);
    setUserNameState(null);
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    router.push("/auth/signin");
  };

  return [logOut];
};
