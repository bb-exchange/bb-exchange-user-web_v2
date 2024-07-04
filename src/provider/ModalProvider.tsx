import { ReactNode } from "react";

import { Modals } from "@components/Modal";

interface Props {
  children: ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Modals />
    </>
  );
};
