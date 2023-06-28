import { basicInstance } from "../instance";

export const fetchArticles = async ({ queryKey }: { queryKey: any[] }) => {
  const [sortBy, page]: string[] = queryKey;

  console.log(queryKey);

  return await basicInstance.get(`/v1/articles`, {
    params: {
      category: "INVESTMENT",
      sortBy: sortBy.toUpperCase(),
      page,
    },
  });
};
