import { basicInstance } from "../instance";
import { IPostDetailRes } from "../interface/post";

export const fetchPost = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, postId] = queryKey;
  if (!postId) return null;

  return (await basicInstance.get(`/v1/articles/${postId}`)) as IPostDetailRes;
};
