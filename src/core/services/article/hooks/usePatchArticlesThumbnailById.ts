import { PATCH_articles_thumbnail_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePatchArticlesThumbnailById = () => {
  return useMutation({
    mutationKey: [PATCH_articles_thumbnail_by_id.name],
    mutationFn: PATCH_articles_thumbnail_by_id,
  });
};
