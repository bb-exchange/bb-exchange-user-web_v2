import { GET_comments_by_article_id } from "../api";

import { useQuery } from "@tanstack/react-query";

export const useGetCommentsByArticleId = (articleId: number) => {
  return useQuery({
    queryKey: [GET_comments_by_article_id.name, articleId],
    queryFn: () => GET_comments_by_article_id({ articleId }),
    select: (data) => data,
  });
};
