import { basicInstance } from "../instance";

export const fetchPost = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, postId] = queryKey;

  return await basicInstance.get(`/v1/articles/${postId}`);
};
