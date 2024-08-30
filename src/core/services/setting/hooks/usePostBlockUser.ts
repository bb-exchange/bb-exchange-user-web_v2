import { POST_block_user } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePostBlockUser = () => {
  return useMutation({
    mutationKey: [POST_block_user.name],
    mutationFn: POST_block_user,
  });
};
