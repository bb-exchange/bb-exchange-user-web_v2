import { AppStore } from ".src/app/store";
import { signOut } from ".src/features/userSlice";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

export const useSignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);

  const logOut = () => {
    dispatch(signOut());
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    router.push("/auth/signin");
  };

  return [logOut];
};
