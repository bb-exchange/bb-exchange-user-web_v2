import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UseWithdrawPopup() {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [withdrawPopup, setWithdrawPopup] = useState<boolean>(false);
  const [compPopup, setCompPopup] = useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    formState,
    setFocus,
    reset,
    handleSubmit,
  } = useForm<IorderWithdraw>();

  useEffect(() => {
    reset();
    setValue("name", "장치은");
    setValue("registNumber", 9510032123456);
    setValue("bank", "국민은행");
    setValue("accountNumber", 44444444444);
    register("amount", { min: { value: 1, message: "" } });
    setValue("amount", 0);
  }, []);

  function getRegistNumStr() {
    const _registNum = watch("registNumber");
    return `${_registNum.toString().slice(0, 6)}-${
      _registNum.toString()[6]
    }******`;
  }

  function getAccountNumber() {
    const _registNum = watch("accountNumber");
    return `${_registNum.toString().slice(0, 3)}********`;
  }

  function onSubmit() {
    setWithdrawPopup(false);
    setCompPopup(true);
  }

  return {
    amountInputRef,
    withdrawPopup,
    setWithdrawPopup,
    compPopup,
    setCompPopup,
    register,
    watch,
    setFocus,
    getRegistNumStr,
    getAccountNumber,
    handleSubmit: handleSubmit(onSubmit),
  };
}
