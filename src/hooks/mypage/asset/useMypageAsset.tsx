import { useState } from "react";

import { D_mypageAssetCategoryList } from ".src/data/mypage/asset/D_mypageAsset";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getBankInfo } from "@api/bank";
import { getActual, postProfitToPoint } from "@api/mypage/settlement";

export default function UseMypageAsset() {
  const categoryList: string[] = D_mypageAssetCategoryList;

  const [category, setCategory] = useState<string>(categoryList[0]);
  const [isPointPopupOpen, setIsPointPopup] = useState<boolean>(false);
  const onOpenPointPopup = () => {
    setChangePointValue(0);
    setIsPointPopup(true);
  };
  const onClosePointPopup = () => {
    setIsPointPopup(false);
  };

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onOpenSuccessPopup = () => {
    setIsSuccess(true);
  };
  const onCloseSuccessPopup = () => {
    setIsSuccess(false);
  };

  const [changePointValue, setChangePointValue] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replace(/[^0-9]/g, ""));

    setChangePointValue(Number(validInputValue));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replaceAll(",", ""));

    let result;
    if (validInputValue >= totalPoint) {
      result = totalPoint;
    } else {
      result = validInputValue;
    }
    setChangePointValue(result);
  };

  const addPoint = (count: number) => {
    const point = Number(changePointValue);
    let result;
    if (point + count >= totalPoint) {
      result = totalPoint;
    } else {
      result = point + count;
    }
    setChangePointValue(result);
  };

  const { mutate: postPoint } = useMutation({
    mutationFn: () => postProfitToPoint({ amount: changePointValue }),
    onSuccess: ({ data }) => {
      onClosePointPopup();
      onOpenSuccessPopup();
      setTotalPoint(data.data.remainingAmount);
    },
  });

  const { data: actualData } = useQuery({
    queryKey: ["getActual"],
    queryFn: () => getActual(),
    select: ({ data }) => {
      setTotalPoint(data.data);
    },
  });
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [isAccount, setIsAccount] = useState<boolean>(false);

  const [noDrawPopup, setNoDrawPopup] = useState<boolean>(false);
  const [drawPopup, setDrawPopup] = useState<boolean>(false);
  const [drawInfoPopup, setDrawInfoPopup] = useState<boolean>(false);

  // NOTE 출금신청 버튼 클릭 시
  const onClickDraw = () => {
    if (isAccount) {
      if (totalPoint < 10000) setNoDrawPopup(true);
      else setDrawPopup(true);
    } else {
      if (totalPoint < 10000) setNoDrawPopup(true);
      else setDrawInfoPopup(true);
    }
  };

  const { data: bankInfo } = useQuery({
    queryKey: ["getBankInfo"],
    queryFn: () => getBankInfo(),
  });

  return {
    categoryList,
    category,
    setCategory,
    isPointPopupOpen,
    onOpenPointPopup,
    onClosePointPopup,
    isSuccess,
    onOpenSuccessPopup,
    onCloseSuccessPopup,
    onChange,
    onBlur,
    addPoint,
    changePointValue,
    postPoint,
    totalPoint,
    onClickDraw,
    isAccount,
    noDrawPopup,
    setNoDrawPopup,
    drawPopup,
    setDrawPopup,
    drawInfoPopup,
    setDrawInfoPopup,
    bankInfo,
  };
}
