import { basicInstance } from "../instance";

interface IData {
  contentType: string;
  md5: string;
  file: File;
}
export const imgPreSignedUrl = async (data: IData) => {
  return await basicInstance
    .post(`/v1/images/presigned`, {
      contentType: data.contentType,
      md5: data.md5,
    })
    .then((res) => res.data);
};
