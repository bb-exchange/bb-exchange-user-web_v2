import React, { ComponentProps, FunctionComponent } from "react";

import dynamic from "next/dynamic";

import { useRecoilValue } from "recoil";

import { modalsAtom } from "@recoil/modal";

const CommonPopup = dynamic(() => import("@components/common/popup/CommonPopup/CommonPopup"), {
  ssr: false,
});
const InvitePopup = dynamic(() => import("@components/invite/InvitePopup"), {
  ssr: false,
});

type ModalType<T> = FunctionComponent<T>;

export const modals = {
  common: CommonPopup as ModalType<ComponentProps<typeof CommonPopup>>,
  invite: InvitePopup as ModalType<ComponentProps<typeof InvitePopup>>,
};

export const Modals = React.memo(() => {
  const _modalsAtom = useRecoilValue(modalsAtom);

  return (
    <>
      {_modalsAtom.map(({ Component, props }, index) => {
        return <Component key={index} {...props} />;
      })}
    </>
  );
});

Modals.displayName = "Modals";
