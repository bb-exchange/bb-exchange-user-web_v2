import { checkUserNickname } from ".src/api/mypage/nickname";
import { editMyProfile } from ".src/api/users/users";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    handleSubmit,
  } = useForm<IeditProf>({ mode: "onChange" });

  // console.log(errors);
  //nickname
  const [isExist, setIsExist] = useState<boolean>();

  const handleOnChange = async (e: any) => {
    if (
      !(errors.nickname?.type === "space") &&
      !(errors.nickname?.type === "enKrNum") &&
      !(errors.nickname?.type === "maxLength") &&
      String(e.target.value)?.length >= 3 &&
      !(errors.nickname?.type === "required")
    ) {
      const res = await checkUserNickname(e.target.value);
      setIsExist(res?.data.data.isExists);
    }
  };

  useEffect(() => {
    register("profImg");

    register("nickname", {
      onChange: handleOnChange,
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

    register("description", {
      maxLength: {
        value: msgMaxLen,
        message: `최대 ${msgMaxLen}자 이하로 입력해주세요.`,
      },
    });
  }, [watch("nickname")]);

  async function onSubmit(data: any) {
    try {
      const res = await editMyProfile({
        nickname: data.nickname,
        description: data.description,
      });

      if (res?.status === 204) {
        router.push("/mypage");
      }
    } catch (error) {}
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
    setValue,
    isExist,
  };
}
