import { atom } from "recoil";

const categoryState = atom({
  key: "categoryState",
  default: "ALL",
});

const isLoginState = atom<boolean>({
  key: "isLoginAtom",
  default: false,
});

const userNameState = atom<string | null>({
  key: "userNameAtom",
  default: null,
});

export { categoryState, isLoginState, userNameState };
