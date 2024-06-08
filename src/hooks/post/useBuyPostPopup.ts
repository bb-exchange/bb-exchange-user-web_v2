import UsePost from "./usePost";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { usePostPurchase } from "@api/articles/usePostPurchase";

import useGetMyProfile from "@hooks/common/useGetProfile";

interface Iprops {
  usePost: ReturnType<typeof UsePost>;
}

export default function UseBuyPostPopup({ usePost }: Iprops) {
  const router = useRouter();

  const { profile } = useGetMyProfile();
  const {} = usePostPurchase(Number(router.query.id));

  const [point, setPoint] = useState<number>(0);
  const [agreeTerm, setAgreeTerm] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setPoint(profile.balance);
    }
  }, [profile]);

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
    agreeTerm,
    onClickAgreeTermBtn,
    onClickConfirmBtn,
    onClickPushMarketBtn,
  };
}
