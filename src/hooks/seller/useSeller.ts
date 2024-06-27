import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

import { userArticles } from "@api/articles/articles";

import { useArticles } from "@hooks/posts/useArticles";

import { queryKeys } from "@recoil/query-keys";

export type CommentSortByType = "PRICE" | "LATEST";
export default function UseSeller() {
  // const [list, setList] = useState<[]>([]);
  const [moreMenu, setMoreMenu] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const [reportConfirmPopup, setReportConfirmPopup] = useState<boolean>(false);
  const [blockPopup, setBlockPopup] = useState<boolean>(false);
  const [blockConfirmPopup, setBlockConfirmPopup] = useState<boolean>(false);
  const [blockCancelPopup, setBlockCancelPopup] = useState<boolean>(false);
  const [cancelBlockConfirmPopup, setCancelBlockConfirmPopup] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [disabledPopup, setDisabledPopup] = useState<boolean>(false);
  const [disabledConfirmPopup, setDisabledConfirmPopup] = useState<boolean>(false);
  const [disabledCancelPopup, setDisabledCancelPopup] = useState<boolean>(false);
  const [disabledCancelConfirmPopup, setDisabledCancelConfirmPopup] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [filterOnSale, setFilterOnSale] = useState<string>("N");

  const [sort, setSort] = useState<CommentSortByType>("LATEST");

  const commentSortByInfo: { [key in CommentSortByType]: string } = {
    LATEST: "최신순",
    PRICE: "가격순",
  };

  const { register, setValue, watch, formState, handleSubmit } = useForm<IuserReport>();

  const router = useRouter();

  const { data: list } = useQuery({
    queryKey: [queryKeys.articleById("writeByUser"), sort],
    queryFn: () => userArticles(`${router?.query?.id}?sortBy=${sort}&page=0`),
    select: (res) => res.data.data ?? [],
    enabled: !!router.query.id,
  });

  useEffect(() => {
    register("category", {
      required: true,
    });
  }, [register]);

  const onClickFilterOnSaleBtn = () => setFilterOnSale((prev) => (prev === "Y" ? "N" : "Y"));

  const onSortList = () => setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

  const onClickReportBtn = () => {
    setMoreMenu(false);
    setReportPopup(true);
  };

  const onClickBlock = () => {
    setMoreMenu(false);
    setBlockPopup(true);
  };

  const onClickDisabled = () => {
    setMoreMenu(false);
    setDisabledPopup(true);
  };

  const onSuccessReportPopup = () => {
    setReportPopup(false);
    setReportConfirmPopup(true);
  };

  const onSuccessBlockBtn = () => {
    setBlockPopup(false);
    setBlockConfirmPopup(true);
    setIsBlocked(true);
    setShowMore(false);
  };

  const onCancelBlockBtn = () => {
    setBlockCancelPopup(true);
  };

  const onSuccessCancelBlockBtn = () => {
    setBlockCancelPopup(false);
    setCancelBlockConfirmPopup(true);
    setIsBlocked(false);
    setShowMore(true);
  };

  const onSuccessDisabledBtn = () => {
    setDisabledPopup(false);
    setDisabledConfirmPopup(true);
    setIsDisabled(true);
    setShowMore(false);
  };

  const onCancelDisabledBtn = () => {
    setDisabledCancelPopup(true);
  };

  const onSuccessCancelDisabledBtn = () => {
    setDisabledCancelPopup(false);
    setDisabledCancelConfirmPopup(true);
    setIsDisabled(false);
    setShowMore(true);
  };

  const onSubmit = () => {};

  return {
    list,
    showMore,
    moreMenu,
    setMoreMenu,
    reportPopup,
    setReportPopup,
    reportConfirmPopup,
    setReportConfirmPopup,
    blockConfirmPopup,
    setBlockConfirmPopup,
    blockCancelPopup,
    setBlockCancelPopup,
    cancelBlockConfirmPopup,
    setCancelBlockConfirmPopup,
    blockPopup,
    setBlockPopup,
    disabledPopup,
    setDisabledPopup,
    disabledConfirmPopup,
    setDisabledConfirmPopup,
    isDisabled,
    onSuccessDisabledBtn,
    onCancelDisabledBtn,
    disabledCancelPopup,
    setDisabledCancelPopup,
    disabledCancelConfirmPopup,
    setDisabledCancelConfirmPopup,
    onSuccessCancelDisabledBtn,
    onClickReportBtn,
    onSuccessReportPopup,
    onSuccessBlockBtn,
    onCancelBlockBtn,
    onSuccessCancelBlockBtn,
    watch,
    setValue,
    handleSubmit,
    onSubmit,
    register,
    formState,
    onClickBlock,
    onClickDisabled,
    isBlocked,

    filterOnSale,
    onClickFilterOnSaleBtn,
    setSort,
    onSortList,
    sort,
    commentSortByInfo,
  };
}
