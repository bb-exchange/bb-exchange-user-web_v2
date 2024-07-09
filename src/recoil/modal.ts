import { ComponentProps, FunctionComponent } from "react";

import { atom } from "recoil";

export interface ModalStateProps {
  title?: string;
  subTitle?: string;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  positiveButtonText?: string;
  onPositiveButtonClick?: Function;
  nagativeButtonText?: string;
  onNagativeButtonClick?: Function;
  zIndex?: number;
}

interface ModalAtom {
  Component: FunctionComponent<any>;
  props: ComponentProps<FunctionComponent<any>>;
}

export const modalsAtom = atom<ModalAtom[]>({
  key: "modalsAtom",
  default: [],
});
