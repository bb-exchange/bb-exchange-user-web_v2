import axios from "axios";

interface IData {
  presignedUrl: string;
  file: File;
  // md5: string,
  imgType: string;
}
export const uploadImg = async (data: IData) => {
  return await axios.put(data.presignedUrl, data.file, {
    headers: {
      "Content-Type": data.imgType,
      // "Content-Type": "multipart/form-data",
      // "Content-MD5": md5,
    },
  });
};
