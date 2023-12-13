import { D_otherPostList, D_replyList } from ".src/data/post/D_post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";

export default function UsePost() {
  const router = useRouter();

  const [otherPostList, setOtherPostList] = useState<any[]>(D_otherPostList);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [like, setLike] = useState<1 | 0 | -1>(0);
  const [reply, setReply] = useState<string>("");
  const [replyList, setReplyList] = useState<Ireply[]>(D_replyList);
  const [postVerPopup, setPostVerPopup] = useState<boolean>(false);
  const [imgPopup, setImgPopup] = useState<string>("");
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const [reportPostPopup, setReportPostPopup] = useState<boolean>(false);
  const [reportUserPopup, setReportUserPopup] = useState<boolean>(false);
  const [hideUserPostPopup, setHideUserPostPopup] = useState<boolean>(false);
  const [compReportPopup, setCompReportPopup] = useState<boolean>(false);
  const [compHideUserPostPopup, setCompHideUserPostPopup] =
    useState<boolean>(false);
  const [buyPopup, setBuyPopup] = useState<boolean>(
    router.query.buyPopup === "true" || false
  );
  const [compPayPopup, setCompPayPopup] = useState<boolean>(
    router.query.compPayPopup === "true" || false
  );

  function onClickLikeBtn(int: -1 | 0 | 1) {
    if (int === like) setLike(0);
    else setLike(int);
  }

  function onClickReportPostBtn() {
    setMorePopup(false);
    setReportPostPopup(true);
  }

  function onSuccessReportPost() {
    setReportPostPopup(false);
    setCompReportPopup(true);
  }

  function onClickReportUserBtn() {
    setMorePopup(false);
    setReportUserPopup(true);
  }

  function onSuccessReportUser() {
    setReportUserPopup(false);
    setCompReportPopup(true);
  }

  function onClickHideUserPostBtn() {
    setMorePopup(false);
    setHideUserPostPopup(true);
  }

  function onSuccessHideUserPost() {
    setHideUserPostPopup(false);
    setCompHideUserPostPopup(true);
  }

  function onClickFavBtn() {
    setIsLike(!isLike);
  }

  return {
    isLike,
    like,
    reply,
    setReply,
    replyList,
    postVerPopup,
    setPostVerPopup,
    onClickLikeBtn,
    otherPostList,
    imgPopup,
    setImgPopup,
    morePopup,
    setMorePopup,
    reportPostPopup,
    onClickReportPostBtn,
    onSuccessReportPost,
    setReportPostPopup,
    reportUserPopup,
    setReportUserPopup,
    onClickReportUserBtn,
    onSuccessReportUser,
    hideUserPostPopup,
    setHideUserPostPopup,
    onClickHideUserPostBtn,
    compReportPopup,
    setCompReportPopup,
    compHideUserPostPopup,
    setCompHideUserPostPopup,
    onSuccessHideUserPost,
    onClickFavBtn,
    buyPopup,
    setBuyPopup,
    compPayPopup,
    setCompPayPopup,
  };
}
