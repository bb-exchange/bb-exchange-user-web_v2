import axios from "axios";

interface IData {
  presignedUrl: string;
  file: any;
  imgType: string;
  md5: string;
}
export const uploadImg = async (data: IData) => {
  return await axios.put(data.presignedUrl, data.file, {
    headers: {
      "Content-Type": data.imgType,
      "Content-MD5": data.md5,
    },
  });
};
