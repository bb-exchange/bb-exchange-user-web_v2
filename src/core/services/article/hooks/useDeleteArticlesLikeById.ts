import { DELETE_articles_like_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useDeleteArticlesLikeById = () => {
  return useMutation({
    mutationKey: [DELETE_articles_like_by_id.name],
    mutationFn: DELETE_articles_like_by_id,
  });
};
