import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import { getBanks } from "@api/bank";
import { getTelecoms } from "@api/phone";

export default function useWithdrawInfoPopup() {
  const { setFocus, setValue, register, handleSubmit, getValues, watch } = useForm<{
    name: string;
    phoneNumber: string;
    bankAccountNumber: string;
    bankCode: string;
    telecomCode: string;
    birthDate: string;
    genderCode: string;
  }>();

  const [agreeCheck, setAgreeCheck] = useState<boolean>(false);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  // 출금 정보 입력 [완료] 버튼
  const onClickDraw = () => {
    console.log(getValues());
  };

  const { data: telecoms } = useQuery({
    queryKey: ["getTelecoms"],
    queryFn: () => getTelecoms(),
  });
  const { data: banks } = useQuery({
    queryKey: ["getBanks"],
    queryFn: () => getBanks(),
  });

  const onSubmit = () => {};

  return {
    handleSubmit,
    onSubmit,
    register,
    setFocus,
    setValue,
    watch,
    onClickDraw,
    telecoms,
    banks,
    agreeCheck,
    setAgreeCheck,
  };
}
