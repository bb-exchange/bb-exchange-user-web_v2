import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function UseEditProf() {
  const router = useRouter();
  const profImgInputRef = useRef<HTMLInputElement>(null);

  const nicknameMinLen = 3;
  const nicknameMaxLen = 10;
  const msgMaxLen = 200;

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    resetField,
    handleSubmit,
  } = useForm<IeditProf>({ mode: "onChange" });

  console.log(errors);

  useEffect(() => {
    register("profImg");

    register("nickname", {
      required: `${nicknameMinLen}자 이상 ${nicknameMaxLen}자 이내로 작성해주세요.`,
      minLength: {
        value: nicknameMinLen,
        message: `${nicknameMinLen}자 이상 ${nicknameMaxLen}자 이내로 작성해주세요.`,
      },
      maxLength: {
        value: nicknameMaxLen,
        message: `${nicknameMinLen}자 이상 ${nicknameMaxLen}자 이내로 작성해주세요.`,
      },
      validate: {
        space: (str: string) =>
          !/\s/g.test(str) || "띄어쓰기를 사용할 수 없습니다.",
        enKrNum: (str: string) =>
          /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/.test(str) ||
          "특수문자를 입력할 수 없습니다.",
      },
    });

    register("msg", {
      maxLength: {
        value: msgMaxLen,
        message: `최대 ${msgMaxLen}자 이하로 입력해주세요.`,
      },
    });

    setValue("nickname", "치은짱짱맨");
  }, []);

  function onSubmit() {
    router.push("/mypage");
  }

  function onChangeProfImg(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (!reader.result) return;

      setValue("profImg", `${reader.result}`);
    };
  }

  return {
    nicknameMaxLen,
    msgMaxLen,
    profImgInputRef,
    register,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    onChangeProfImg,
  };
}
