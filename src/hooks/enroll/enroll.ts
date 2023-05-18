import { useEffect, useMemo, useState } from "react";
import {
  imgHandler,
  redoBtnHandler,
  undoBtnHandler,
} from ".src/util/textEditor";
import { useForm } from "react-hook-form";

function useEnroll(quillRef: any) {
  const [errMsgBusy, setErrMsgBusy] = useState<boolean>(false);
  const [selCategoryPopup, setSelCategoryPopup] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const form = useForm<IenrollProps>();

  useEffect(() => {
    form.register("content", {
      required: "내용을 좀 더 입력하면 상장될 것 같아요",
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
