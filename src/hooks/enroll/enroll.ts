import { useMemo } from "react";
import {
  imgHandler,
  redoBtnHandler,
  undoBtnHandler,
} from ".src/util/textEditor";

function useQuill(quillRef: any) {
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

  return [modules];
}

export default useQuill;
