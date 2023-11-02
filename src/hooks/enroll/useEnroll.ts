import { useEffect, useMemo, useRef, useState } from "react";
import {
  base64toFile,
  redoBtnHandler,
  undoBtnHandler,
} from ".src/util/textEditor";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postArticle, postImages } from ".src/api/articles/articles";

export default function useEnroll(quillRef: any) {
  const [contObj, setContObj] = useState<any>();
  const [selectImg, setSelectImg] = useState<HTMLImageElement>();
  const [errMsgBusy, setErrMsgBusy] = useState<boolean>(false);
  const [selCategoryPopup, setSelCategoryPopup] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [draftsPopup, setDraftsPopup] = useState<boolean>(false);
  const [delDraftPopup, setDelDraftPopup] = useState<boolean>(false);
  const [loadDraftPopup, setLoadDraftPopup] = useState<boolean>(false);

  const { register, watch, setValue, formState, resetField, handleSubmit } =
    useForm<IenrollProps>({ mode: "onChange" });

  // const enrollPostMutation = useMutation(postArticle, {
  //   onSuccess: (res) => console.log(res),
  // });

  // const enrollImagesMutation = useMutation(postImages, {
  //   onSuccess: (res) => console.log(res),
  // });

  const enrollPostMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: (res) => console.log(res),
  });

  const enrollImagesMutation = useMutation({
    mutationFn: postImages,
    onSuccess: (res) => console.log(res),
  });

  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    return ((e || window.event).returnValue = ""); // Gecko + Webkit, Safari, Chrome etc.
  };

  useEffect(() => {
    register("content", {
      required: "내용을 좀 더 입력하면 상장될 것 같아요",
      minLength: {
        value: 100,
        message: "최소 100글자 이상 입력해주세요",
      },
    });

    window.addEventListener("beforeunload", beforeUnloadHandler, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    if (errMsgBusy) return;

    const { errors } = formState;

    let _errKeys = Object.values(errors);
    let _errMsgs = _errKeys.map((e) => e.message);

    if (!_errMsgs[0]) return;

    setErrMsg(_errMsgs[0]!);
  }, [errMsgBusy, formState]);

  async function uploadImgFile() {
    if (!(contObj && contObj.ops)) return;

    let ops = contObj.ops;

    let images = await Promise.all(
      ops?.map(async (v: any, i: number) => {
        if (!(v.insert && v.insert.image)) return;

        const editorSrc = v.insert.image;
        if (editorSrc.startsWith("data:image/")) {
          const file = await base64toFile(editorSrc, `${i}`);
          return file;
        }
      })
    );

    images = images.filter((e) => e);
    await enrollImagesMutation.mutateAsync({ images });
  }

  async function onClickEnrollBtn() {
    await uploadImgFile();
    // enrollPostMutation.mutateAsync({
    //   title: watch("title"),
    //   category: watch("category").category,
    //   content: watch("content"),
    //   articleTagList: watch("tagList"),
    //   thumbnailImage: watch("thumbNail"),
    // });
  }

  const imgHandler = (quillRef: any) => {
    const quill = quillRef.current.getEditor();
    let fileInput = quill.root.querySelector("input.ql-image[type=file]");

    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.classList.add("ql-image");

      fileInput.addEventListener("change", () => {
        const files = fileInput.files;
        const range = quill.getSelection(true);

        if (!files || !files.length) {
          console.log("No files selected");
          return;
        }

        if (files[0].size > 5242880) {
          setErrMsg("5MB 이하의 이미지를 사용해 주세요");
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          quill.insertEmbed(range.index, "image", reader.result);
          quill.setSelection(range.index + 1);
          fileInput.value = "";
        };
      });

      quill.root.appendChild(fileInput);
    }
    fileInput.click();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: () => imgHandler(quillRef),
          undoBtn: () => undoBtnHandler(quillRef),
          redoBtn: () => redoBtnHandler(quillRef),
        },
      },
    }),
    [quillRef]
  );

  const closeErrMsg = () => {
    setErrMsg("");
    setErrMsgBusy(true);
  };

  const setNewTag = (newTag: string) => {
    newTag = newTag.replace(/#/g, "");

    let _tagList = watch("tagList") || [];

    if (_tagList.indexOf(newTag) === -1) {
      _tagList.push(newTag);
      setValue("tagList", _tagList);
    }
  };

  const handleTagOnChange = (v: string) => {
    let _str = v.replace(/#/g, "");

    if (_str) {
      _str = "#" + _str;
      setValue("tag", _str);
    } else resetField("tag");
  };

  const handleOnClickTagList = (v: string) => {
    let _tagList = watch("tagList") || [];
    _tagList = _tagList.filter((e) => e !== v);
    setValue("tagList", _tagList);
  };

  const handleOnClickQuillImg = (e: React.MouseEvent) => {
    let _target: any = e.target;

    if (_target.tagName !== "IMG") return;
    setSelectImg(_target);
  };

  const handleOnClickSetThumbnailBtn = () => {
    if (!selectImg) return;

    console.log(selectImg.setAttribute("thumb", "true"));
    const thumbBox = document.createElement("em");
    thumbBox.className = "thumbBox";

    selectImg.replaceWith(thumbBox);
    thumbBox.appendChild(selectImg);

    setValue("thumbNail", selectImg.src);
    setSelectImg(undefined);
  };

  const handleOnClickDelImgBtn = () => {
    if (!selectImg) return;

    // content에서 이미지 삭제
    let _imgString = `${selectImg?.outerHTML}`;
    let _delImg = watch("content").replace(_imgString, "");
    setValue("content", _delImg);

    // 삭제 이미지가 섬네일일 경우 섬네일 삭제
    if (watch("thumbNail") === selectImg.src) setValue("thumbNail", "");

    // 선택이미지 비움
    setSelectImg(undefined);
  };

  return {
    modules,
    register,
    watch,
    setValue,
    formState,
    resetField,
    handleSubmit,
    selCategoryPopup,
    setSelCategoryPopup,
    setContObj,
    selectImg,
    setSelectImg,
    errMsg,
    setErrMsg,
    errMsgBusy,
    setErrMsgBusy,
    closeErrMsg,
    setNewTag,
    handleTagOnChange,
    handleOnClickTagList,
    handleOnClickQuillImg,
    handleOnClickSetThumbnailBtn,
    handleOnClickDelImgBtn,
    mobileView,
    setMobileView,
    draftsPopup,
    setDraftsPopup,
    delDraftPopup,
    setDelDraftPopup,
    loadDraftPopup,
    setLoadDraftPopup,
    enrollPostMutation,
    onClickEnrollBtn,
  };
}
