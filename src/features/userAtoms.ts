import { SetRecoilState, atom, selector } from "recoil";

export const isLoginAtom = atom<boolean>({
  key: "isLoginAtom",
  default: false,
});

export const userNameAtom = atom<string>({
  key: "userNameAtom",
  default: "",
});
