import { isLoginState } from ".src/recoil";
import { useRecoilValue } from "recoil";

export default function useCommonHeader() {
  const isSignedIn = useRecoilValue(isLoginState);

  return { isSignedIn };
}
