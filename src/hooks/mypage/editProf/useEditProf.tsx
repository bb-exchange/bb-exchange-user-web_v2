import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { imgPreSignedUrl } from ".src/api/images/imgPreSignedUrl";
import { uploadImg } from ".src/api/images/uploadImg";
import { checkUserNickname } from ".src/api/mypage/nickname";
import { editMyProfile } from ".src/api/users/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CryptoJS from "crypto-js";

interface IUploadFile {
  presignedUrl: string;
  imgPath: string;
  imgType: string;
  file: any;
  md5: string;
  fileByte: any;
}

const nicknameMinLen = 3;
const nicknameMaxLen = 10;
const msgMaxLen = 200;

export default function UseEditProf() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const profImgInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IeditProf>({ mode: "onChange" });

  const isSuccessEdit = useRef<boolean>(false);

  const [isExist, setIsExist] = useState<boolean>();
  const [uploadFile, setUploadFile] = useState<FileList | null>(null);
  const [fileInfo, setFileInfo] = useState<IUploadFile>({
    presignedUrl: "",
    imgPath: "",
    imgType: "",
    file: null,
    fileByte: null,
    md5: "",
  });
  const [isNotSavedPopup, setIsNotSavedPopup] = useState<boolean>(false);

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
        space: (str: string) => !/\s/g.test(str) || "띄어쓰기를 사용할 수 없습니다.",
        enKrNum: (str: string) =>
          /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/.test(str) || "특수문자를 입력할 수 없습니다.",
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

  const editProfileMutation = useMutation({
    mutationFn: editMyProfile,
    onSuccess: () => {
      isSuccessEdit.current = true;
    },
    onError: (error: any) => {
      if (error.response?.data.code === "USR032") {
        setIsNotSavedPopup(true);
      }
    },
  });

  const onSubmit = (data: any) => {
    const imagePath = fileInfo.imgPath ? fileInfo.imgPath : data.profImg ? data.profImg : "";
    editProfileMutation.mutate({
      nickname: data.nickname,
      description: data.description,
      imagePath,
    });
  };

  //NOTE - [API] Presigned url 발급
  const presignedUrlMutation = useMutation({
    mutationFn: imgPreSignedUrl,
    onSuccess: (data, variables) => {
      setFileInfo({
        presignedUrl: data.data.presignedUrl,
        imgPath: data.data.imagePath,
        imgType: variables.contentType,
        file: variables.file,
        fileByte: variables.fileByte,
        md5: variables.md5,
      });
    },
  });

  //NOTE - [API] 발급받은 Presigned url로 이미지 업로드
  const imgUploadMutation = useMutation({
    mutationFn: uploadImg,
    onSuccess: () => {
      queryClient.setQueryData(["myProfile"], (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              profileImage: fileInfo.imgPath,
            },
          },
        };
      });
    },
  });

  //NOTE - 프로필 수정 완료되면 버킷에 이미지 업로드
  useEffect(() => {
    if (isSuccessEdit.current && fileInfo) {
      imgUploadMutation.mutate({
        presignedUrl: fileInfo.presignedUrl,
        imgType: fileInfo.imgType,
        file: fileInfo.fileByte,
        md5: fileInfo.md5,
      });
      isSuccessEdit.current = false;
      router.push("/mypage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEdit.current, fileInfo]);

  //NOTE - 파일 업로드 시, MD5 해시값 생성 & Presigned url 발급
  useEffect(() => {
    if (!uploadFile) return;

    [...uploadFile].map((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (reader.readyState === 2) {
          const arrayBuffer: any = e.target?.result;

          const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
          const md5 = CryptoJS.MD5(wordArray);
          const base64Incod = md5.toString(CryptoJS.enc.Base64);

          presignedUrlMutation.mutate({
            contentType: file.type,
            md5: base64Incod,
            file: file,
            fileByte: arrayBuffer,
          });
        }
      };
      reader.readAsArrayBuffer(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFile]);

  function onChangeProfImg(e: ChangeEvent<HTMLInputElement>) {
    const files = e?.target?.files;
    setUploadFile(files);

    if (!files?.length) return;

    [...files].map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (!reader.result) return;

        if (reader.readyState === 2) {
          setValue("profImg", `${reader.result}`);
        }
      };
    });
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
    isNotSavedPopup,
    setIsNotSavedPopup,
  };
}
