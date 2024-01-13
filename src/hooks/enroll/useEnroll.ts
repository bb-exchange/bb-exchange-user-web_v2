import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  base64toFile,
  redoBtnHandler,
  undoBtnHandler,
} from ".src/util/textEditor";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { MD5, enc } from "crypto-js";

import {
  deleteArticleTemp,
  getArticleTemp,
  getArticlesTemp,
  patchArticleTemp,
  postArticle,
  postArticleTemp,
  postImages,
} from ".src/api/articles/articles";
import { uploadImg } from ".src/api/images/uploadImg";
import { imgPreSignedUrl } from ".src/api/images/imgPreSignedUrl";

export default function useEnroll(editor: Editor | null) {
  const router = useRouter();

  const [contObj, setContObj] = useState<any>();
  const [selectImg, setSelectImg] = useState<HTMLImageElement>();
  const [errMsgBusy, setErrMsgBusy] = useState<boolean>(false);
  const [selCategoryPopup, setSelCategoryPopup] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [draftsPopup, setDraftsPopup] = useState<boolean>(false);
  const [delDraftPopup, setDelDraftPopup] = useState<boolean>(false);
  const [loadDraftPopup, setLoadDraftPopup] = useState<boolean>(false);
  const [writeCancelPopup, setWriteCancelPopup] = useState<boolean>(false);
  const [successPostPopup, setSuccessPostPopup] = useState<boolean>(false);
  const [tempSuccessPostPopup, setTempSuccessPostPopup] =
    useState<boolean>(false);
  const [previewImgs, setPrevieImgs] = useState<Set<any>>(new Set());
  const [files, setFiles] = useState<
    Map<
      string,
      {
        file: File;
        type: string;
        presignedUrl: string;
        imgPath: string;
        md5: string;
      }
    >
  >(new Map());
  const [tempNum, setTempNum] = useState<number>(0);
  const [tempArticleId, setTempArticleId] = useState<number | null>(null);
  const [btnName, setBtnName] = useState<string>("게시하기");
  const [successTempUpdatePopup, setSuccessTempUpdatePopup] =
    useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    getValues,
    formState,
    resetField,
    handleSubmit,
    clearErrors,
    setError,
  } = useForm<IenrollProps>({ mode: "onChange" });

  //NOTE - [API] 임시저장 글 목록
  const { data: articleTempList, refetch: getTempList } = useQuery({
    queryKey: ["tempArticles"],
    queryFn: getArticlesTemp,
  });

  //NOTE - [API] 선택한 임시저장 글
  const { data: tempArticle, refetch } = useQuery({
    queryKey: ["tempArticle"],
    queryFn: () => getArticleTemp(tempArticleId ?? 0),
    enabled: false,
  });

  //NOTE - [API] 불러온 임시저장 글 수정하기
  const updateTempMutation = useMutation({
    mutationFn: patchArticleTemp,
    onSuccess: () => {
      setSuccessTempUpdatePopup(true);
    },
  });

  //NOTE - [API] 발급받은 Presigned url로 이미지 업로드
  const isSuccessEnroll = useRef<boolean>(false);
  const imgUploadMutation = useMutation({
    mutationFn: uploadImg,
    onSuccess: (data, variables, context) => {
      // 내가 작성한 게시글 페이지로 이동되야 함
      // 로딩 붙이기, id필요
      if (isSuccessEnroll.current) {
        router.push(`/post/${data.data.articleId}`);
      }
      // router.push("/post/[id]");
    },
  });
  //NOTE - [API] 게시글 등록
  const enrollPostMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: (data) => {
      setSuccessPostPopup(true);
      isSuccessEnroll.current = true;
      router.push(`/post/${data.articleId}`);
    },
  });

  //NOTE - 게시글 등록되면 버킷에 이미지 업로드
  useEffect(() => {
    if (isSuccessEnroll.current) {
      [...files.values()].map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.file);

        reader.onload = (e) => {
          imgUploadMutation.mutate({
            presignedUrl: file.presignedUrl,
            imgType: file.type,
            file: e?.target?.result,
            md5: file.md5,
          });
        };
      });
      isSuccessEnroll.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEnroll.current, files]);

  //NOTE - [API] Presigned url 발급
  const presignedUrlMutation = useMutation({
    mutationFn: imgPreSignedUrl,
    onSuccess: (data, variables) => {
      setFiles((prevState) => {
        prevState = new Map(prevState);
        prevState.set(variables.file.name, {
          file: variables.file,
          type: variables.file.type,
          presignedUrl: data.data.presignedUrl,
          imgPath: data.data.imagePath,
          md5: variables.md5,
        });
        return prevState;
      });
    },
  });

  //NOTE - 파일 업로드
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevieImgs(new Set());

    const files = e?.target?.files;

    if (!files?.length) return;

    [...files].map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!reader.result) return;

        setPrevieImgs((prevState) => {
          prevState = new Set(prevState);
          prevState.add(reader.result);
          return prevState;
        });

        if (reader.readyState === 2) {
          var binary: any = e.target?.result;

          let hash = MD5(binary);
          const md5 = hash.toString(enc.Base64);

          presignedUrlMutation.mutate({
            contentType: file.type,
            md5: md5,
            file,
          });
        }
      };
    });
  };

  //NOTE - 파일 업로드 시, 이미지 에디터에 Preview
  useEffect(() => {
    if (previewImgs.size) {
      [...previewImgs.keys()].map(
        (img) =>
          editor &&
          editor
            .chain()
            .focus()
            .setImage({
              src: img,
            })
            .run()
      );
    }
  }, [editor, previewImgs]);

  //NOTE - [API] 임시저장
  const enrollTempPostMutation = useMutation({
    mutationFn: postArticleTemp,
    onSuccess: () => {
      setTempSuccessPostPopup(true);
      getTempList();
    },
  });

  //NOTE - [API] 임시저장 글 삭제
  const deleteTempMutation = useMutation({
    mutationFn: deleteArticleTemp,
    onSuccess: (data, variables, context) => {
      getTempList();
    },
  });

  //NOTE - 임시저장 글 불러오기 클릭 시
  const onLoadTempArticle = () => {
    setDraftsPopup(false);
    setLoadDraftPopup(false);

    if (tempArticleId) {
      refetch();
      setBtnName("수정하기");
    }
  };

  //NOTE - 임시저장 글 삭제
  const onDeleteTemp = () => {
    tempArticleId && deleteTempMutation.mutate(tempArticleId);
    setDelDraftPopup(false);
  };

  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    return ((e || window.event).returnValue = ""); // Gecko + Webkit, Safari, Chrome etc.
  };

  useEffect(() => {
    editor?.commands.focus();
  }, [editor]);

  useEffect(() => {
    // if (errMsgBusy) return;

    const { errors } = formState;
    // console.log("1errors", errors);

    let _errKeys = Object.values(errors);
    let _errMsgs = _errKeys.map((e) => e.message);
    // console.log("_errMsgs", _errKeys, _errMsgs);

    if (!_errMsgs[0]) return;

    setErrMsg(_errMsgs[0]!);
  }, [errMsgBusy, formState]);

  //NOTE - 게시하기 클릭 시
  const onClickEnrollBtn = useCallback(() => {
    if (!watch("category.description")) {
      return setError("category", {
        type: "noText",
        message: "카테고리를 선택해주세요",
      });
    }
    if (!watch("title")) {
      return setError("title", {
        type: "noText",
        message: "제목을 입력해주세요",
      });
    }
    if (!editor?.getText()) {
      return setError("content", {
        type: "noText",
        message: "내용을 입력해주세요",
      });
    }
    if (editor?.getText().length < 100) {
      return setError("content", {
        type: "minLength",
        message: "최소 100글자 이상 입력해주세요",
      });
    }

    //NOTE - 이미지 주소 치환 작업
    const fileImgUrls: string[] = [];
    if (files.size) {
      [...files.values()].map((file) => fileImgUrls.push(file.imgPath));
    }

    let editorJson = editor?.getJSON();
    if (files.size) {
      editorJson?.content?.map((item: any) => {
        item.content?.map((content: any) => {
          if (content.type === "image") {
            editorJson = {
              ...editorJson,
              content: editorJson?.content?.map((item: any) => {
                return {
                  ...item,
                  content: item.content?.map((content: any, i: number) => {
                    if (content.type === "image") {
                      return {
                        ...content,
                        attrs: {
                          ...content.attrs,
                          src: fileImgUrls[i],
                        },
                      };
                    }
                    return content;
                  }),
                };
              }),
            };
          }
        });
      });
    }

    const body = {
      title: watch("title"),
      category: watch("category").category,
      content: editor ? JSON.stringify({ ...editorJson }) : ``,
      articleTagList: [],
      thumbnailImage: "",
    };

    // console.log("body", editorJson);

    if (btnName === "수정하기" && tempArticleId) {
      updateTempMutation.mutate({ articleId: tempArticleId, body });
      return;
    }

    enrollPostMutation.mutate(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    btnName,
    editor,
    files,
    setError,
    tempArticleId,
    updateTempMutation,
    watch,
  ]);

  // async function onClickEnrollBtn() {

  // }

  //NOTE - 임시저장 클릭 시
  const onClickEnrollTemp = () => {
    if (!watch("category.description")) {
      return setError("category", {
        type: "noText",
        message: "카테고리를 선택해주세요",
      });
    }

    if (editor) {
      const body = {
        title: watch("title"),
        category: watch("category").category,
        content: JSON.stringify({ ...editor.getJSON() }),
        articleTagList: [],
        thumbnailImage: "",
      };

      enrollTempPostMutation.mutate(body);
    }
  };

  //NOTE - 임시저장 목록 팝업 오픈
  const openDraftsPopup = () => {
    setDraftsPopup(true);
    getTempList();
  };

  const isDisabledBtn =
    formState.isValid &&
    editor?.getText() &&
    editor?.getText()?.length > 100 &&
    watch("title") &&
    watch("title").length < 40 &&
    watch("category")
      ? false
      : true;

  // const imgHandler = (quillRef: any) => {
  //   const quill = quillRef.current.getEditor();
  //   let fileInput = quill.root.querySelector("input.ql-image[type=file]");

  //   if (fileInput === null) {
  //     fileInput = document.createElement("input");
  //     fileInput.setAttribute("type", "file");
  //     fileInput.setAttribute("accept", "image/*");
  //     fileInput.classList.add("ql-image");

  //     fileInput.addEventListener("change", () => {
  //       const files = fileInput.files;
  //       const range = quill.getSelection(true);

  //       if (!files || !files.length) {
  //         console.log("No files selected");
  //         return;
  //       }

  //       if (files[0].size > 5242880) {
  //         setErrMsg("5MB 이하의 이미지를 사용해 주세요");
  //         return;
  //       }

  //       let reader = new FileReader();
  //       reader.readAsDataURL(files[0]);
  //       reader.onloadend = () => {
  //         quill.insertEmbed(range.index, "image", reader.result);
  //         quill.setSelection(range.index + 1);
  //         fileInput.value = "";
  //       };
  //     });

  //     quill.root.appendChild(fileInput);
  //   }
  //   fileInput.click();
  // };

  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: "#toolbar",
  //       handlers: {
  //         image: () => imgHandler(quillRef),
  //         undoBtn: () => undoBtnHandler(quillRef),
  //         redoBtn: () => redoBtnHandler(quillRef),
  //       },
  //     },
  //   }),
  //   [quillRef]
  // );

  const closeErrMsg = () => {
    setErrMsg("");
    clearErrors();
    // setErrMsgBusy(true);
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

    // console.log(selectImg.setAttribute("thumb", "true"));
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
    // modules,
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
    isDisabledBtn,
    writeCancelPopup,
    setWriteCancelPopup,
    successPostPopup,
    setSuccessPostPopup,
    onClickEnrollTemp,
    tempSuccessPostPopup,
    setTempSuccessPostPopup,
    editor,
    handleChangeImg,
    openDraftsPopup,
    articleTempList,
    // ?
    tempNum,
    setTempNum,
    setTempArticleId,
    onLoadTempArticle,
    tempArticle,
    btnName,
    successTempUpdatePopup,
    setSuccessTempUpdatePopup,
    onDeleteTemp,
  };
}
