import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function usePostInquiry() {
  const router = useRouter();

  const [openCompletePopup, setOpenCompletePopup] = useState<boolean>(
    router.query.openCompletePopup === "true" || false
  );
  const [openBlockPopup, setOpenBlockPopup] = useState<boolean>(
    router.query.openBlockPopup === "true" || false
  );
  const {
    register,
    watch,
    setValue,
    formState,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<IpostInquiry>({
    mode: "onChange",
  });

  let disable =
    errors.content ||
    errors.title ||
    !watch("title") ||
    watch("content").length < 10
      ? true
      : false;

  function onSubmit(data: IpostInquiry) {
    console.log(data);
    setOpenCompletePopup(true);
  }

  //뒤로가기 막기 팝업창 추가
  const preventGoBack = () => {
    history.pushState(null, "", null);
    setOpenBlockPopup(true);
  };

  useEffect(() => {
    (() => {
      history.pushState(null, "", null);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
    onSubmit,
    errors,
    disable,
    openCompletePopup,
    setOpenCompletePopup,
    openBlockPopup,
    setOpenBlockPopup,
  };
}
