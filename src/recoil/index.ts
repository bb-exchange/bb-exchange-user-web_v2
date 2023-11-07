import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const categoryState = atom({
  key: "categoryState",
  default: "ALL",
});

const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});

const userNameState = atom<string | null>({
  key: "userNameState",
  default: null,
});

const activePostTypeState = atom<string>({
  key: "activePostTypeState",
  default: "최신",
  effects_UNSTABLE: [persistAtom],
});

export { categoryState, isLoginState, userNameState, activePostTypeState };
