import { POST_articles_dislike_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePostArticlesDislikeById = () => {
  return useMutation({
    mutationKey: [POST_articles_dislike_by_id.name],
    mutationFn: POST_articles_dislike_by_id,
  });
};
