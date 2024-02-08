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

export async function base64toFile(base_data: any, filename: string) {
  var arr = base_data.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
