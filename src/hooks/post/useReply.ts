import { useState } from "react";

export default function UseReply() {
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const [reportReplyPopup, setReportReplyPopup] = useState<boolean>(false);
  const [reportUserPopup, setReportUserPopup] = useState<boolean>(false);
  const [hideUserPostPopup, setHideUserPostPopup] = useState<boolean>(false);
  const [compReportPopup, setCompReportPopup] = useState<boolean>(false);

  function onClickReportReplyBtn() {
    setMorePopup(false);
    setReportReplyPopup(true);
  }

  function onSuccessReportReply() {
    setReportReplyPopup(false);
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

  function setHideUserPostBtn() {
    setMorePopup(false);
    setHideUserPostPopup(true);
  }

  return {
    morePopup,
    setMorePopup,
    reportReplyPopup,
    setReportReplyPopup,
    onClickReportReplyBtn,
    onSuccessReportReply,
    reportUserPopup,
    setReportUserPopup,
    onClickReportUserBtn,
    onSuccessReportUser,
    hideUserPostPopup,
    setHideUserPostPopup,
    setHideUserPostBtn,
    compReportPopup,
    setCompReportPopup,
  };
}
