import { atom } from "recoil";

import { Heading } from "@data/enroll/D_heading";

interface HeadingAtom extends Heading {}

export const headingAtom = atom<HeadingAtom>({
  key: "headingAtom",
  default: {
    key: "MAIN_1",
    value: "본문 1",
  },
});
