import { DELETE_block_user } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useDeleteBlockUser = () => {
  return useMutation({
    mutationKey: [DELETE_block_user.name],
    mutationFn: DELETE_block_user,
  });
};
