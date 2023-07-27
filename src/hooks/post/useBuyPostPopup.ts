import { useState } from "react";
import usePost from "./usePost";

interface Iprops {
  usePost: ReturnType<typeof usePost>;
}

export default function UseBuyPostPopup({ usePost }: Iprops) {
  const [agreeTerm, setAgreeTerm] = useState<boolean>(false);

  function onClickAgreeTermBtn() {
    setAgreeTerm(!agreeTerm);
  }

  function onClickConfirmBtn() {
    usePost.setBuyPopup(false);
    usePost.setCompPayPopup(true);
  }

  return { agreeTerm, onClickAgreeTermBtn, onClickConfirmBtn };
}
