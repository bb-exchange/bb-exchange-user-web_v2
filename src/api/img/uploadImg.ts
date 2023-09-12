import axios from "axios";

export const uploadImg = async (
  presignedUrl: string,
  uploadFile: File,
  md5: string
) => {
  return await axios.put(presignedUrl, uploadFile, {
    headers: {
      "Content-Type": "multipart/form-data",
      "COntent-MD5": md5,
    },
  });
};
