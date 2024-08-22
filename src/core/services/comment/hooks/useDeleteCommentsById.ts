import { DELETE_comments_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useDeleteCommentsById = () => {
  return useMutation({
    mutationKey: [DELETE_comments_by_id.name],
    mutationFn: DELETE_comments_by_id,
  });
};
