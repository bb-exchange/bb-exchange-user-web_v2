import { AppStore } from ".src/app/store";
import { useSelector } from "react-redux";

export default function useCommonHeader() {
  const isSignedIn = useSelector((state: AppStore) => state.user.isSignedIn);

  return {  isSignedIn };
}
