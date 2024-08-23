import { PATCH_articles_show_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePatchArticlesShowById = () => {
  return useMutation({
    mutationKey: [PATCH_articles_show_by_id.name],
    mutationFn: PATCH_articles_show_by_id,
  });
};
