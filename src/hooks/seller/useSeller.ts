import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UseSeller() {
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

  const { register, setValue, watch, formState, handleSubmit } =
    useForm<IuserReport>();

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
  };

  const onCancelBlockBtn = () => {
    setBlockCancelPopup(true);
  };

  const onSuccessCancelBlockBtn = () => {
    setBlockCancelPopup(false);
    setCancelBlockConfirmPopup(true);
    setIsBlocked(false);
  };

  const onSuccessDisabledBtn = () => {
    setDisabledPopup(false);
    setDisabledConfirmPopup(true);
  };

  const onCancelDisabledBtn = () => {};

  const onSubmit = () => {};

  return {
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
