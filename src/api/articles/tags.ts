import { basicInstance } from "../instance";

export const fetchTagList = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, keyword]: string[] = queryKey;

  return await basicInstance.get(`/v1/articles/tag`, {
    params: {
      word: keyword,
    },
  });
};
