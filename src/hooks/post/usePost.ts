import { ComponentProps, useState } from "react";

import { useRouter } from "next/router";

import { modals } from "@components/Modal";

import { useModals } from "@hooks/modal";

export default function UsePost() {
  const router = useRouter();
  const { openModal, closeModal } = useModals();

  const [isLike, setIsLike] = useState<boolean>(false);
  const [like, setLike] = useState<1 | 0 | -1>(0);
  const [reply, setReply] = useState<string>("");
  const [postVerPopup, setPostVerPopup] = useState<boolean>(false);
  const [imgPopup, setImgPopup] = useState<string>("");
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const [reportPostPopup, setReportPostPopup] = useState<boolean>(false);
  const [reportUserPopup, setReportUserPopup] = useState<boolean>(false);
  const [hideUserPostPopup, setHideUserPostPopup] = useState<boolean>(false);
  const [compHideUserPostPopup, setCompHideUserPostPopup] = useState<boolean>(false);
  const [buyPopup, setBuyPopup] = useState<boolean>(router.query.buyPopup === "true" || false);
  const [compPayPopup, setCompPayPopup] = useState<boolean>(
    router.query.compPayPopup === "true" || false,
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
    openReportSuccessModal();
  }

  function onClickReportUserBtn() {
    setMorePopup(false);
    setReportUserPopup(true);
  }

  function onSuccessReportUser() {
    setReportUserPopup(false);
    openReportSuccessModal();
  }

  const openReportSuccessModal = () => {
    openModal(modals.common, {
      title: "신고가 접수되었습니다.",
      onPositiveButtonClick: () => closeModal(modals.common),
    });
  };

  const openChangePriceModal = () => {
    openModal(modals.common, {
      title: "가격이 변동되었어요",
      subTitle: "다시 결제를 진행해주세요.",
      onPositiveButtonClick: () => closeModal(modals.common),
    });
  };

  const openDailyEventRewardModal = ({
    title,
    subTitle,
  }: ComponentProps<(typeof modals)["common"]>) => {
    openModal(modals.common, {
      title,
      subTitle,
      iconSrc: "/assets/icons/RewardIcon.png",
      iconWidth: 96,
      iconHeight: 96,
      onPositiveButtonClick: () => closeModal(modals.common),
    });
  };

  const openPurchaseErrorModal = () => {
    openModal(modals.common, {
      subTitle: "알 수 없는 오류입니다.",
      iconSrc: "/assets/icons/Warning.svg",
      iconWidth: 60,
      iconHeight: 60,
      onPositiveButtonClick: () => closeModal(modals.common),
    });
  };

  const openCommentSpamModal = () => {
    openModal(modals.common, {
      title: "댓글 도배",
      subTitle: "3분 뒤에 다시 작성할 수 있어요.",
      onPositiveButtonClick: () => closeModal(modals.common),
    });
  };

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
    postVerPopup,
    setPostVerPopup,
    onClickLikeBtn,
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
    openChangePriceModal,
    openDailyEventRewardModal,
    openPurchaseErrorModal,
    openCommentSpamModal,
    hideUserPostPopup,
    setHideUserPostPopup,
    onClickHideUserPostBtn,
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
