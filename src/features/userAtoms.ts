import { atom } from "recoil";

interface IUserInfo {
  isSignedIn: boolean;
  nickname: string | null;
}
export const userAtom = atom<IUserInfo>({
  key: "userInfo",
  default: {
    isSignedIn: false,
    nickname: null,
  },
});
