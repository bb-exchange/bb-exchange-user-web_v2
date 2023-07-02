export function undoBtnHandler(quillRef: any) {
  const quill = quillRef.current.getEditor();
  return quill.history.undo();
}

export function redoBtnHandler(quillRef: any) {
  const quill = quillRef.current.getEditor();
  return quill.history.redo();
}

export const quillFormats = [
  "header",
  "size",
  "bold",
  "align",
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
