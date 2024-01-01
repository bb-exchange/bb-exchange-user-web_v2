import { basicInstance } from "../instance";

interface IData {
  contentType: string;
  md5: string;
  file: File;
}
export const imgPreSignedUrl = async (data: IData) => {
  return await basicInstance
    .post(`/v1/images/presigned`, {
      ...data,
    })
    .then((res) => res.data);
};
