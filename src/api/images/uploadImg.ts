import axios from "axios";

export const uploadImg = async (
  presignedUrl: string,
  uploadFile: File,
  md5: string,
  imgType: string
) => {
  return await axios.put(presignedUrl, uploadFile, {
    headers: {
      "Content-Type": imgType,
      // "Content-Type": "multipart/form-data",
      "Content-MD5": md5,
    },
  });
};
