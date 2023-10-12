import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { userArticles } from ".src/api/articles/articles";
import { queryKeys } from ".src/features/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function UseSeller() {
  const [list, setList] = useState<[]>([]);
  const [moreMenu, setMoreMenu] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const [reportConfirmPopup, setReportConfirmPopup] = useState<boolean>(false);
  const [blockPopup, setBlockPopup] = useState<boolean>(false);
  const [blockConfirmPopup, setBlockConfirmPopup] = useState<boolean>(false);
  const [blockCancelPopup, setBlockCancelPopup] = useState<boolean>(false);
  const [cancelBlockConfirmPopup, setCancelBlockConfirmPopup] =
    useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [disabledPopup, setDisabledPopup] = useState<boolean>(false);
  const [disabledConfirmPopup, setDisabledConfirmPopup] =
    useState<boolean>(false);
  const [disabledCancelPopup, setDisabledCancelPopup] =
    useState<boolean>(false);
  const [disabledCancelConfirmPopup, setDisabledCancelConfirmPopup] =
    useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(true);

  const { register, setValue, watch, formState, handleSubmit } =
    useForm<IuserReport>();

  // 타인 글 목록 리스트
  // TODO 아이디 연결 필요
  useQuery(
    queryKeys.articleById("writeByUser"),
    () => userArticles(`31?sortBy=LATEST&page=0`),
    {
      onSuccess: (data) => {
        setList(data?.data.data.contents);
      },
      retry: false,
    }
  );

  useEffect(() => {
    register("category", {
      required: true,
    });
  }, [register]);

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
  };
}
