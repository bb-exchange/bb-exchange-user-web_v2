import { fetchPost } from ".src/api/post/post";
import { D_otherPostList, D_replyList } from ".src/data/post/D_post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function usePost() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [unLimted, setUnLimited] = useState<boolean>(
    router.query.unLimited === "true" || false
  );
  const [otherPostList, setOtherPostList] =
    useState<IpostList[]>(D_otherPostList);
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
  const [buyPopup, setBuyPopup] = useState<boolean>(false);

  const { data: postData } = useQuery(["post", router.query.id], fetchPost, {
    retry: false,
    onSuccess: (res) => {
      console.log(res);
    },
  });

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
    inputRef,
    postData,
    unLimted,
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
  };
}
