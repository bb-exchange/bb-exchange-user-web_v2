import { PATCH_articles_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePatchArticlesById = () => {
  return useMutation({
    mutationKey: [PATCH_articles_by_id.name],
    mutationFn: PATCH_articles_by_id,
  });
};
