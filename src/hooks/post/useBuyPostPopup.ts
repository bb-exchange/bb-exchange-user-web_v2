import UsePost from "./usePost";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { QueryObserverResult } from "@tanstack/react-query";

import { usePostPurchase } from "@api/articles/usePostPurchase";
import { PostData } from "@api/interface";

import useGetMyProfile from "@hooks/common/useGetProfile";

interface Iprops {
  usePost: ReturnType<typeof UsePost>;
  originalPrice: number;
  refetchArticle: () => Promise<QueryObserverResult<PostData, Error>>;
}

export default function UseBuyPostPopup({ usePost, originalPrice, refetchArticle }: Iprops) {
  const router = useRouter();

  const { profile } = useGetMyProfile();
  const { postPurchase } = usePostPurchase();

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

  async function onClickConfirmBtn() {
    const { data } = await refetchArticle();

    // 결제중 가격 변동이 발생했을경우
    if (originalPrice !== data?.priceInfo.price) {
      usePost.setChangePricePopup(true);
      return;
    }

    postPurchase(Number(router.query.id), {
      onSuccess: () => {
        usePost.setBuyPopup(false);
        usePost.setCompPayPopup(true);
      },
      onError: () => {
        usePost.setIsPurchaseErrorPopupShow(true);
      },
    });
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
