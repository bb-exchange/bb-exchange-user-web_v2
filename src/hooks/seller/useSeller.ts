import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { userArticles } from "@api/articles/articles";
import { useGetReportReasons } from "@api/users/useGetReportReasons";
import { usePostReportByUserId } from "@api/users/usePostReportByUserId";

import { profileState } from "@recoil/index";
import { queryKeys } from "@recoil/query-keys";

export type ReportProps = {
  reason: string;
  content?: string;
};
export type CommentSortByType = "PRICE" | "LATEST";

export default function UseSeller() {
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
  const [stockListed, setStockListed] = useState<boolean>(false);
  const profile = useRecoilValue(profileState);

  const [sort, setSort] = useState<CommentSortByType>("LATEST");

  const commentSortByInfo: { [key in CommentSortByType]: string } = {
    LATEST: "최신순",
    PRICE: "가격순",
  };

  const onClickstockListedBtn = () => setStockListed((prev) => !prev);
  const onSortList = () => setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

  const router = useRouter();

  const { data: list } = useQuery({
    queryKey: [queryKeys.articleById("writeByUser"), sort, stockListed],
    queryFn: () =>
      userArticles(`${router?.query?.id}?sortBy=${sort}&page=0&stockListed=${stockListed}`),
    select: (res) => res.data.data ?? [],
    enabled: !!router.query.id,
  });

  const { register, setValue, watch, formState, handleSubmit } = useForm<ReportProps>();

  /*
  report: 사용자 신고하기
  */
  const { reportReasons } = useGetReportReasons();
  const reportForm = useForm<ReportProps>();

  const onClickReportBtn = () => {
    setMoreMenu(false);
    setReportPopup(true);
  };

  const onSuccessReportPopup = () => {
    setReportPopup(false);
    setReportConfirmPopup(true);
  };

  const { postReportByUserIdMutate } = usePostReportByUserId();

  const onReportSubmit = (data: ReportProps) => {
    console.log("on report submit data: ", data);
    onSuccessReportPopup();
    postReportByUserIdMutate({ userId: Number(router?.query?.id), author: profile.userId, data });
  };
  useEffect(() => {
    reportForm.register("reason", {
      required: true,
    });
  }, [reportForm.register]);

  /*
  hide: 이 사용자의 글 보지않기
  */
  /*
  block: 사용자 차단하기
  */

  const onClickBlock = () => {
    setMoreMenu(false);
    setBlockPopup(true);
  };

  const onClickDisabled = () => {
    setMoreMenu(false);
    setDisabledPopup(true);
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
    reportForm,
    reportPopup,
    onReportSubmit,
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

    stockListed,
    onClickstockListedBtn,
    setSort,
    onSortList,
    sort,
    commentSortByInfo,
    reportReasons,
  };
}
