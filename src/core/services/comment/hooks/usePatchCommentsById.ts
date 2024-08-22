import { PATCH_comments_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePatchCommentsById = () => {
  return useMutation({
    mutationKey: [PATCH_comments_by_id.name],
    mutationFn: PATCH_comments_by_id,
  });
};
