"use client";

import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";

import {
  deleteArticleTemp,
  getArticle,
  getArticleTemp,
  getArticlesTemp,
  patchArticleTag,
  patchArticleTemp,
  patchArticleThumbnail,
  postArticle,
  postArticleTemp,
  updateArticle,
} from ".src/api/articles/articles";
import { uploadImg } from ".src/api/images/uploadImg";
import { imgPreSignedUrl } from ".src/api/images/imgPreSignedUrl";
import { useRecoilValue } from "recoil";
import { selectedEditorNodeState } from ".src/recoil";

export default function useEnroll(editor: Editor | null) {
  const router = useRouter();

  const selectedEditorNodePos = useRecoilValue(selectedEditorNodeState);

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
  const [files, setFiles] = useState<
    Map<
      string,
      {
        file: File;
        fileByte: any;
        type: string;
        presignedUrl: string;
        imgPath: string;
        md5: any;
      }
    >
  >(new Map());
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [tempNum, setTempNum] = useState<number>(0);
  const [tempArticleId, setTempArticleId] = useState<number | null>(null);
  const [btnName, setBtnName] = useState<string>("게시하기");
  const [successTempUpdatePopup, setSuccessTempUpdatePopup] =
    useState<boolean>(false);
  const [editListedPopup, setEditListedPopup] = useState<boolean>(false);
  const [editPopup, setEditPopup] = useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    formState,
    resetField,
    handleSubmit,
    clearErrors,
    setError,
  } = useForm<IenrollProps>({ mode: "onChange" });

  //NOTE = [API] 내 글 불러오기
  const myArticleId = router.asPath.split("/")[2];
  const { data: myArticleData } = useQuery<any>({
    queryKey: ["getArticle"],
    queryFn: () => getArticle(`${myArticleId}`),
    enabled: !!myArticleId,
  });
  useEffect(() => {
    if (myArticleData?.tagList.length) {
      setValue(
        "tagList",
        myArticleData.tagList.map((v: any) => v.tagName)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myArticleData]);

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

  //NOTE - [API] 내 게시글 수정하기
  const updateMutation = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      isSuccessEnroll.current = true;

      if (myArticleData.articleInfo.isListed) {
        setEditListedPopup(true);
      } else {
        setEditPopup(true);
      }
    },
  });

  //NOTE - [API] 발급받은 Presigned url로 이미지 업로드
  const isSuccessEnroll = useRef<boolean>(false);
  const imgUploadMutation = useMutation({
    mutationFn: uploadImg,
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

  //NOTE - [API] 썸네일 업데이트
  const updateThumbMutation = useMutation({
    mutationFn: patchArticleThumbnail,
  });

  //NOTE - [API] 태그 업데이트
  const updateTagMutation = useMutation({
    mutationFn: patchArticleTag,
  });

  //NOTE - 게시글 등록되면 버킷에 이미지 업로드
  useEffect(() => {
    if (
      isSuccessEnroll.current &&
      (btnName === "게시하기" || (btnName === "수정하기" && !tempArticleId))
    ) {
      [...files.values()].map((file) => {
        imgUploadMutation.mutate({
          presignedUrl: file.presignedUrl,
          imgType: file.type,
          file: file.fileByte,
          md5: file.md5,
        });
      });
      isSuccessEnroll.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEnroll.current, files, btnName, tempArticleId]);

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
          fileByte: variables.fileByte,
        });
        return prevState;
      });
    },
  });

  //NOTE - 파일 업로드 시, MD5 해시값 생성 & Presigned url 발급
  useEffect(() => {
    if (!uploadFiles) return;
    if (btnName === "게시하기" || (btnName === "수정하기" && !tempArticleId)) {
      [...uploadFiles].map((file) => {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFiles, btnName, tempArticleId]);

  //NOTE - 파일 업로드
  // 1. 이미지 프리뷰
  // 2. 파일 저장
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    setUploadFiles(files);

    if (!files?.length) return;

    [...files].map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      if (file.size > 5242880) {
        setErrMsg("5MB 이하의 이미지를 사용해 주세요");
        return;
      }

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!reader.result) return;

        //NOTE - 파일 업로드 시, 이미지 에디터에 Preview
        editor?.commands.setImage({
          src: reader.result as string,
          fileName: file.name,
        });
      };
    });
  };

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
    onSuccess: () => {
      getTempList();
    },
  });

  //NOTE - 임시저장 글 불러오기 클릭 시
  const onLoadTempArticle = () => {
    setDraftsPopup(false);
    setLoadDraftPopup(false);

    if (tempArticleId) {
      refetch();
      setBtnName("작성하기");
    }
  };

  //NOTE - 임시저장 글 삭제
  const onDeleteTemp = () => {
    tempArticleId && deleteTempMutation.mutate(tempArticleId);
    setDelDraftPopup(false);
  };

  useEffect(() => {
    editor?.commands.focus();
  }, [editor]);

  useEffect(() => {
    const { errors } = formState;

    let _errKeys = Object.values(errors);
    let _errMsgs = _errKeys.map((e) => e.message);

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

    if (btnName === "수정하기" && tempArticleId) {
      editorJson = {
        ...editorJson,
        content: editorJson?.content?.filter(
          (item: any) => item.type !== "figure"
        ),
      };
    } else {
      editorJson = {
        ...editorJson,
        content: editorJson?.content?.map((item: any, i: number) => {
          let chagnedItem = item;
          if (item.type === "figure" && files.has(item.attrs.fileName)) {
            chagnedItem = {
              ...item,
              attrs: {
                ...item.attrs,
                src: fileImgUrls[0],
              },
            };
            fileImgUrls.shift();
          }

          return chagnedItem;
        }),
      };
    }

    const thumb = editorJson.content?.filter(
      (item: any) => item.type === "figure" && item.attrs.isThumb
    );

    let thumbNail = thumb?.length ? thumb[0]?.attrs?.src : "";

    const firstThumb = editorJson.content?.filter(
      (item: any) => item.type === "figure"
    );

    if (!thumb?.length && firstThumb?.length) {
      thumbNail = firstThumb[0]?.attrs?.src;
    }

    const body = {
      title: watch("title"),
      category: watch("category").category,
      content: editor ? JSON.stringify({ ...editorJson }) : ``,
      articleTagList: watch("tagList") ?? [],
      thumbnailImage: thumbNail,
    };

    // console.log("body, editorJson", body, editorJson);
    // console.log("thumbNail", thumbNail, myArticleId);

    // 임시저장글 -> 수정하기
    if (btnName === "작성하기" && tempArticleId) {
      enrollPostMutation.mutate(body);
      onDeleteTemp();
      return;
    }
    // 내글 수정하기
    if (btnName === "수정하기" && !tempArticleId) {
      console.log(`tempArticleId ${tempArticleId}`);
      updateThumbMutation.mutate({
        articleId: myArticleId,
        body: {
          thumbnail: thumbNail,
        },
      });
      updateTagMutation.mutate({
        articleId: myArticleId,
        body: {
          articleTagList: watch("tagList") ?? [],
        },
      });
      updateMutation.mutate({
        articleId: myArticleId,
        body: {
          title: watch("title"),
          category: watch("category").category,
          content: editor ? JSON.stringify({ ...editorJson }) : ``,
        },
      });
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

  //NOTE - 임시저장 클릭 시
  const onClickEnrollTemp = () => {
    setWriteCancelPopup(false);

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

    if (editor) {
      let editorJson = editor?.getJSON();

      if (files.size) {
        editorJson = {
          ...editorJson,
          content: editorJson?.content?.filter(
            (item: any) => item.type !== "figure"
          ),
        };
      }

      const body = {
        title: watch("title"),
        category: watch("category").category,
        content: JSON.stringify({ ...editorJson }),
        articleTagList: watch("tagList") ?? [],
        thumbnailImage: watch("thumbNail") ?? "",
      };

      enrollTempPostMutation.mutate(body);
    }
  };

  //NOTE - editor 클릭 시 이미지 element추출
  const onClickEditor = (e: React.MouseEvent) => {
    let _target: any = e.target;

    if (_target.tagName !== "IMG") return;
    setSelectImg(_target);
  };

  //NOTE - 썸네일 지정
  const onSetThumbnail = () => {
    //@ts-ignore
    if (selectImg?.isthumb !== "true")
      editor?.commands.setThumb(selectedEditorNodePos);

    setSelectImg(undefined);
  };

  //NOTE - 선택된 이미지 삭제
  const onDeleteImage = () => {
    if (!selectImg) return;

    const fileName = selectImg?.getAttribute("filename") as string;
    files.delete(fileName);

    // 삭제 이미지가 섬네일일 경우 섬네일 삭제
    if (watch("thumbNail") === selectImg.src) setValue("thumbNail", "");

    if (selectedEditorNodePos !== null)
      editor?.commands.deleteImage(selectedEditorNodePos);

    setSelectImg(undefined);
  };

  //NOTE - 임시저장 목록 팝업 오픈
  const openDraftsPopup = () => {
    setDraftsPopup(true);
    getTempList();
  };

  const isDisabledBtn =
    editor?.getText() &&
    editor?.getText()?.length > 100 &&
    watch("title") &&
    watch("title").length < 40 &&
    watch("category")
      ? false
      : true;

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

  const handleOnClickSetThumbnailBtn = () => {};
  const handleOnClickDelImgBtn = () => {};
  const handleOnClickQuillImg = () => {};

  return {
    // modules,
    register,
    watch,
    onSetThumbnail,
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
    onClickEditor,
    handleOnClickQuillImg,
    handleOnClickSetThumbnailBtn,
    onDeleteImage,
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
    tempNum,
    setTempNum,
    setTempArticleId,
    onLoadTempArticle,
    tempArticle,
    btnName,
    successTempUpdatePopup,
    setSuccessTempUpdatePopup,
    onDeleteTemp,
    setBtnName,
    myArticleData,
    editListedPopup,
    setEditListedPopup,
    editPopup,
    setEditPopup,
  };
}
