export function imgHandler(quillRef: any) {
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

      // if (files[0].size > mib2) {
      //   toast("2MiB 이하의 이미지를 사용해 주세요");
      //   return;
      // }

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
}

export function undoBtnHandler(quillRef:any) {
  const quill = quillRef.current.getEditor();
  return quill.history.undo();
}

export function redoBtnHandler(quillRef:any) {
  const quill = quillRef.current.getEditor();
  return quill.history.redo();
}

export const quillFormats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];
