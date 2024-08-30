import { PATCH_articles_hide_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePatchArticlesHideById = () => {
  return useMutation({
    mutationKey: [PATCH_articles_hide_by_id.name],
    mutationFn: PATCH_articles_hide_by_id,
  });
};
