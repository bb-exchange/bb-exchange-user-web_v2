import { useCookies } from "react-cookie";

import { useRouter } from "next/router";

import { isLoginState, userNameState } from ".src/recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

export const useSignOut = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);

  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

  const queryClient = useQueryClient();

  const logOut = () => {
    setIsLoginState(false);
    setUserNameState(null);
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    router.push("/auth/signin");
  };

  return [logOut];
};
