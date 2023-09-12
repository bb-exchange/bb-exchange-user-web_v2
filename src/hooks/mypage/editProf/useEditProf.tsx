import { imgPreSignedUrl } from ".src/api/images/imgPreSignedUrl";
import { checkUserNickname } from ".src/api/mypage/nickname";
import { editMyProfile } from ".src/api/users/users";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MD5 } from "crypto-js";
import { uploadImg } from ".src/api/images/uploadImg";

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

  const [isExist, setIsExist] = useState<boolean>();
  const [uploadFile, setUploadFile] = useState<any | null>(null);
  const [imgType, setImgType] = useState<string>("");
  const [md5, setMd5] = useState<string | null>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("nickname")]);

  const onSubmit = async (data: any) => {
    try {
      const res = await editMyProfile({
        nickname: data.nickname,
        description: data.description,
      });

      if (uploadFile && md5) {
        const { data } = await imgPreSignedUrl({
          contentType: imgType,
          md5,
        });

        await uploadImg(data.presignedUrl, uploadFile, md5);
      }

      // if (res?.status === 204) {
      //   router.push("/mypage");
      // }
    } catch (error) {}
  };

  function onChangeProfImg(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!e.target.files) return;

    const file = e.target.files[0];
    setImgType(file.type);
    // setUploadFile(file);

    const formData = new FormData();
    formData.append("image", file);
    setUploadFile(formData);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    // if (file) {
    // reader.readAsBinaryString(file);
    // }
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (!reader.result) return;

      if (reader.readyState === 2) {
        const binary: any = ev?.target?.result;
        const md5 = MD5(binary).toString();
        setMd5(md5);

        setValue("profImg", `${reader.result}`);
      }
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
