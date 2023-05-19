import { useEffect, useMemo, useState } from "react";
import { redoBtnHandler, undoBtnHandler } from ".src/util/textEditor";
import { useForm } from "react-hook-form";
import { watch } from "fs";

function useEnroll(quillRef: any) {
  const [errMsgBusy, setErrMsgBusy] = useState<boolean>(false);
  const [selCategoryPopup, setSelCategoryPopup] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const form = useForm<IenrollProps>();

  useEffect(() => {
    form.register("content", {
      required: "내용을 좀 더 입력하면 상장될 것 같아요",
      minLength: {
        value: 100,
        message: "최소 100글자 이상 입력해주세요",
      },
    });
  }, []);

  useEffect(() => {
    if (errMsgBusy) return;

    const { errors } = form.formState;

    let _errKeys = Object.values(errors);
    let _errMsgs = _errKeys.map((e) => e.message);

    if (!_errMsgs[0]) return;

    setErrMsg(_errMsgs[0]!);
  }, [form.formState]);

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
    []
  );

  const closeErrMsg = () => {
    setErrMsg("");
    setErrMsgBusy(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let _newTag = form.watch("tag");
    if (!_newTag) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      let _tagList = form.watch("tagList") || [];

      if (_tagList.indexOf(_newTag) === -1) {
        _tagList.push(_newTag);
        form.setValue("tagList", _tagList);
      }
      form.resetField("tag");
    }
  };

  const handleTagOnChange = (v: string) => {
    let _str = v.replace(/#/g, "");

    if (_str) {
      _str = "#" + _str;
      form.setValue("tag", _str);
    } else form.resetField("tag");
  };

  const handleOnClickTagList = (v: string) => {
    let _tagList = form.watch("tagList") || [];
    _tagList = _tagList.filter((e) => e !== v);
    form.setValue("tagList", _tagList);
  };

  return {
    modules,
    form,
    selCategoryPopup,
    setSelCategoryPopup,
    errMsg,
    setErrMsg,
    errMsgBusy,
    setErrMsgBusy,
    closeErrMsg,
    handleKeyDown,
    handleTagOnChange,
    handleOnClickTagList,
  };
}

export default useEnroll;
