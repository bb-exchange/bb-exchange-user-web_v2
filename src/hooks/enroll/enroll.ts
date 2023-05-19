import { useEffect, useMemo, useState } from "react";
import { redoBtnHandler, undoBtnHandler } from ".src/util/textEditor";
import { useForm } from "react-hook-form";

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
  };
}

export default useEnroll;
