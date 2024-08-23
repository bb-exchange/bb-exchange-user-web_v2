import { POST_articles } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePostArticles = () => {
  return useMutation({
    mutationKey: [POST_articles.name],
    mutationFn: POST_articles,
  });
};
