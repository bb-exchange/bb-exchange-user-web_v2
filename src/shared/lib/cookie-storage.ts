import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { StateStorage } from "zustand/middleware";

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { maxAge: 24 * 60 * 60 }); // 1 day
  },
  removeItem: (name: string) => {
    deleteCookie(name);
  },
};

export default cookieStorage;
