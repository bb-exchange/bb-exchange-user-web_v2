import { ComponentProps, FunctionComponent, useCallback } from "react";

import { useSetRecoilState } from "recoil";

import { modalsAtom } from "@recoil/modal";

/**
 * @author yykim
 * @contents 공통 Modal 제어 CustomHook 입니다.
 * @returns openModal(modal컴포넌트, modal props)
 * @returns closeModal(modal컴포넌트)
 * @Ex openModal(modals.common, {...해당 modal Component의 props}})
 */
export const useModals = () => {
  const setModalAtom = useSetRecoilState(modalsAtom);

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T, props: ComponentProps<T>) => {
      setModalAtom((modals) => [...modals, { Component, props }]);
    },
    [setModalAtom],
  );

  const closeModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T) => {
      setModalAtom((modals) => modals.filter((modal) => modal.Component !== Component));
    },
    [setModalAtom],
  );

  return {
    openModal,
    closeModal,
  };
};
