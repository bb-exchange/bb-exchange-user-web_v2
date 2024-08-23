import { DELETE_articles_dislike_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useDeleteArticlesDislikeById = () => {
  return useMutation({
    mutationKey: [DELETE_articles_dislike_by_id.name],
    mutationFn: DELETE_articles_dislike_by_id,
  });
};
