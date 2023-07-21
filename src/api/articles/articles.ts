import { basicInstance } from "../instance";

export const fetchArticles = async ({ queryKey }: { queryKey: any[] }) => {
  const [sortBy, page]: string[] = queryKey;

  return await basicInstance.get(`/v1/articles`, {
    params: {
      category: "RELATIONSHIP",
      sortBy: sortBy.toUpperCase(),
      page,
    },
  });
};
