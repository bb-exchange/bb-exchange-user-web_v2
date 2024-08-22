import { POST_comments } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePostComments = () => {
  return useMutation({
    mutationKey: [POST_comments.name],
    mutationFn: POST_comments,
  });
};
