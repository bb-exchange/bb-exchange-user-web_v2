import axios from "axios";

export const uploadImg = async (presignedUrl: string, uploadFile: File) => {
  return await axios.put(presignedUrl, uploadFile, {
    headers: {
      "Content-Type": uploadFile.type,
    },
  });
};
