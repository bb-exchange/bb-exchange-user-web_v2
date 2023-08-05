import { useState } from "react";
import usePost from "./usePost";
import { useRouter } from "next/router";

interface Iprops {
  usePost: ReturnType<typeof usePost>;
}

export default function UseBuyPostPopup({ usePost }: Iprops) {
  const router = useRouter();

  const [point, setPoint] = useState<number>(Number(router.query.point || 0));
  const [price, setPrice] = useState<number>(425);
  const [agreeTerm, setAgreeTerm] = useState<boolean>(false);

  function onClickAgreeTermBtn() {
    setAgreeTerm(!agreeTerm);
  }

  function onClickConfirmBtn() {
    usePost.setBuyPopup(false);
    usePost.setCompPayPopup(true);
  }

  function onClickPushMarketBtn() {
    router.push("/charge");
  }

  return {
    point,
    price,
    agreeTerm,
    onClickAgreeTermBtn,
    onClickConfirmBtn,
    onClickPushMarketBtn,
  };
}
