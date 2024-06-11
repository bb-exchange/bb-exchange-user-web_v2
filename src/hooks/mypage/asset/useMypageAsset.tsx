import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { D_mypageAssetCategoryList } from ".src/data/mypage/asset/D_mypageAsset";
import { useMutation, useQuery } from "@tanstack/react-query";

import { BankInfoType, getBankDetails, getBanks, updateBankDetails } from "@api/bank";
import { getActual, postProfitToPoint, postSettlement } from "@api/mypage/settlement";
import { getTelecoms } from "@api/phone";

import { onHandlePhoneRegex } from "@utils/regex";

export default function UseMypageAsset() {
  const categoryList: string[] = D_mypageAssetCategoryList;

  const [category, setCategory] = useState<string>(categoryList[0]);
  const [isPointPopupOpen, setIsPointPopup] = useState<boolean>(false);
  const onOpenPointPopup = () => {
    setChangePointValue(0);
    setIsPointPopup(true);
  };
  const onClosePointPopup = () => {
    setIsPointPopup(false);
  };

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onOpenSuccessPopup = () => {
    setIsSuccess(true);
  };
  const onCloseSuccessPopup = () => {
    setIsSuccess(false);
  };

  const [changePointValue, setChangePointValue] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replace(/[^0-9]/g, ""));

    setChangePointValue(Number(validInputValue));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replaceAll(",", ""));

    let result;
    if (validInputValue >= totalPoint) {
      result = totalPoint;
    } else {
      result = validInputValue;
    }
    setChangePointValue(result);
  };

  const addPoint = (count: number) => {
    const point = Number(changePointValue);
    let result;
    if (point + count >= totalPoint) {
      result = totalPoint;
    } else {
      result = point + count;
    }
    setChangePointValue(result);
  };

  const { mutate: postPoint } = useMutation({
    mutationFn: () => postProfitToPoint({ amount: changePointValue }),
    onSuccess: ({ data }) => {
      onClosePointPopup();
      onOpenSuccessPopup();
      setTotalPoint(data.data.remainingAmount);
    },
  });

  const { data: actualData, isSuccess: actualIsSuccess } = useQuery({
    queryKey: ["getActual"],
    queryFn: () => getActual(),
    select: ({ data }) => {
      setTotalPoint(data.data);

      setChangePointValue(data.data);
    },
  });

  const bankInfoForm: BankInfoType = {
    name: "",
    phoneNumber: "",
    bankAccountNumber: "",
    bankCode: "",
    telecomCode: "",
    birthDate: "",
    genderCode: "",
  };
  const {
    data: bankDetailData,
    isSuccess: bankDetailIsSuccess,
    refetch,
  } = useQuery({
    queryKey: ["getBankDetails"],
    queryFn: () => getBankDetails(),
  });

  const [totalPoint, setTotalPoint] = useState<number>(0);

  const [noDrawPopup, setNoDrawPopup] = useState<boolean>(false);
  const [drawPopup, setDrawPopup] = useState<boolean>(false);
  const [drawInfoPopup, setDrawInfoPopup] = useState<boolean>(false);
  const [withdrawInfoPopup, setWithDrawInfoPopup] = useState<boolean>(false);
  const [settlementSuccess, setSettlementSuccess] = useState<boolean>(false);
  // NOTE 출금신청 버튼 클릭 시
  const onClickDraw = () => {
    if (totalPoint < 10000) setNoDrawPopup(true);
    else {
      if (!bankDetailData?.data?.data.bankAccountNumber || !bankDetailData?.data?.data.bankCode) {
        setRegisterAccountNumberNecessity(true);
      } else {
        setDrawPopup(true);
      }
    }
  };

  const { mutate: updateSettlement } = useMutation({
    mutationFn: postSettlement,
    onSuccess: ({ data }) => {
      setTotalPoint(data.remainingAmount);
      setDrawPopup(false);
      setSettlementSuccess(true);
    },
  });

  // [출금 신청] -> 신청하기 버튼
  const onApplyWithdrawSubmit = () => {
    updateSettlement({ amount: changePointValue });
  };

  // [출금 신청] -> [실명 정보 및 계좌 입력 필요] 팝업
  const [registerAccountNumberNecessity, setRegisterAccountNumberNecessity] =
    useState<boolean>(false);
  const onRegisterAccountNumberNecessityPopupOpen = () => {
    setRegisterAccountNumberNecessity(true);
  };
  const onRegisterAccountNumberNecessityPopupClose = () => {
    setRegisterAccountNumberNecessity(false);
  };

  // [출금 계좌] 버튼
  const onRegisterAccountNumberPopupOpen = () => {
    setWithDrawInfoPopup(true);
  };
  const onRegisterAccountNumberPopupClose = () => {
    setWithDrawInfoPopup(false);
  };

  const { setFocus, setValue, register, handleSubmit, getValues, formState, reset, watch } =
    useForm<BankInfoType>({
      defaultValues: bankInfoForm,
      mode: "onBlur",
      reValidateMode: "onSubmit",
    });

  const [agreeCheck, setAgreeCheck] = useState<boolean>(false);

  useEffect(() => {
    if (bankDetailIsSuccess) {
      const phoneNumber = onHandlePhoneRegex(bankDetailData.data.data.phoneNumber);

      reset({
        ...bankDetailData.data.data,
        phoneNumber: phoneNumber,
      });
    }
  }, [bankDetailData]);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const [isRegisterAccountNumberSuccess, setIsRegisterAccountNumberSuccess] =
    useState<boolean>(false);

  const { mutate: updateBankDetailsMutate } = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      refetch();
      onRegisterAccountNumberPopupClose();
      setIsRegisterAccountNumberSuccess(true);
    },
  });

  // 출금 정보 입력 [완료] 버튼
  const onRegisterAccountNumberSubmit = () => {
    const data: BankInfoType = {
      ...getValues(),
      phoneNumber: getValues("phoneNumber").replaceAll("-", ""),
    };
    updateBankDetailsMutate(data);
  };

  const { data: telecoms } = useQuery({
    queryKey: ["getTelecoms"],
    queryFn: () => getTelecoms(),
  });
  const { data: banks } = useQuery({
    queryKey: ["getBanks"],
    queryFn: () => getBanks(),
  });

  return {
    categoryList,
    category,
    setCategory,
    isPointPopupOpen,
    onOpenPointPopup,
    onClosePointPopup,
    isSuccess,
    onOpenSuccessPopup,
    onCloseSuccessPopup,
    onChange,
    onBlur,
    addPoint,
    changePointValue,
    postPoint,
    totalPoint,
    onClickDraw,
    noDrawPopup,
    setNoDrawPopup,
    drawPopup,
    setDrawPopup,
    drawInfoPopup,
    setDrawInfoPopup,
    bankInfoForm,

    handleSubmit,
    register,
    setFocus,
    watch,
    setValue,
    getValues,
    telecoms,
    banks,
    agreeCheck,
    setAgreeCheck,
    formState,
    bankDetailData,
    reset,

    onRegisterAccountNumberPopupOpen,
    withdrawInfoPopup,
    onRegisterAccountNumberPopupClose,

    onRegisterAccountNumberSubmit,
    isRegisterAccountNumberSuccess,
    setIsRegisterAccountNumberSuccess,

    registerAccountNumberNecessity,
    onRegisterAccountNumberNecessityPopupOpen,
    onRegisterAccountNumberNecessityPopupClose,
    onApplyWithdrawSubmit,
    settlementSuccess,
    setSettlementSuccess,
  };
}
