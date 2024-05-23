import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useWithdrawInfoPopup() {
  const [nameAccountRequestAlertPopup, setNameAccountRequestAlertPopup] = useState<boolean>(false);

  const { setFocus, register, handleSubmit, getValues } = useForm<{
    name: string;
    accountNumber: string;
  }>();

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  // NOTE 출금신청 클릭 시
  const onClickDraw = () => {
    // 실명 및 계좌정보 미입력 시
    if (!getValues("name")) {
      setNameAccountRequestAlertPopup(true);
    }
  };

  const onSubmit = () => {};

  return {
    handleSubmit,
    onSubmit,
    register,
    onClickDraw,
    nameAccountRequestAlertPopup,
    setNameAccountRequestAlertPopup,
  };
}
