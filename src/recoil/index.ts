import { AtomEffect, atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const ssrComplatedState = atom({
  key: "SsrCompleted",
  default: false,
});

export const useSsrCompletedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrComplatedState);

  return () => setSsrCompleted(true);
};

const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrComplatedState).then(() => persistAtom(param));
};

const categoryState = atom({
  key: "categoryState",
  default: "ALL",
});

const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
  effects_UNSTABLE: [persistAtomEffect],
});

const userNameState = atom<string | null>({
  key: "userNameState",
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});

const selectedEditorNodeState = atom<number | null>({
  key: "selectedEditorNodeState",
  default: null,
});

export { categoryState, isLoginState, userNameState, selectedEditorNodeState };
