import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UseWithdrawPopup() {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [withdrawPopup, setWithdrawPopup] = useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    formState,
    setFocus,
    resetField,
    handleSubmit,
  } = useForm<IorderWithdraw>({
    defaultValues: {
      amount: 0,
    },
  });

  useEffect(() => {
    setValue("name", "장치은");
    setValue("registNumber", 9510032123456);
    setValue("bank", "국민은행");
    setValue("accountNumber", 44444444444);
    register("amount", { min: { value: 1, message: "" } });
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
    resetField();
    setWithdrawPopup(false);
  }

  return {
    amountInputRef,
    withdrawPopup,
    setWithdrawPopup,
    register,
    watch,
    setFocus,
    getRegistNumStr,
    getAccountNumber,
    handleSubmit: handleSubmit(onSubmit),
  };
}
