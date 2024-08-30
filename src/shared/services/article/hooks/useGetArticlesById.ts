import { GET_articles_by_id } from "../api";

import { useQuery } from "@tanstack/react-query";

export const useGetArticlesById = (articleId: number) => {
  return useQuery({
    queryKey: [GET_articles_by_id.name, articleId],
    queryFn: () => GET_articles_by_id({ articleId }),
    select: (data) => data,
  });
};
