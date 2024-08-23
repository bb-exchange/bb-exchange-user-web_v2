import { POST_articles_like_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePostArticlesLikeById = () => {
  return useMutation({
    mutationKey: [POST_articles_like_by_id.name],
    mutationFn: POST_articles_like_by_id,
  });
};
