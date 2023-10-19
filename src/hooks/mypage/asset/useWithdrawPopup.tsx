import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UseWithdrawPopup() {
  const router = useRouter();

  const amountInputRef = useRef<HTMLInputElement>(null);

  const [withdrawPopup, setWithdrawPopup] = useState<boolean>(
    router.query.withdrawPopup === "true" || false
  );
  const [compPopup, setCompPopup] = useState<boolean>(
    router.query.compPopup === "true" || false
  );

  const {
    register,
    watch,
    setValue,
    formState,
    setFocus,
    reset,
    handleSubmit,
  } = useForm<IorderWithdraw>({
    defaultValues: {
      name: "장치은",
      registNumber: 9510032123456,
      bank: "국민은행",
      accountNumber: 44444444444,
      amount: 0,
    },
  });

  useEffect(() => {
    register("amount", { min: { value: 1, message: "" } });
  }, []);

  function getRegistNumStr() {
    const _registNum: number = watch("registNumber");
    return `${_registNum?.toString().slice(0, 6)}-${
      _registNum?.toString()[6]
    }******`;
  }

  function getAccountNumber() {
    const _accountNum = watch("accountNumber");
    return `${_accountNum?.toString().slice(0, 3)}********`;
  }

  function onSubmit() {
    reset();
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
