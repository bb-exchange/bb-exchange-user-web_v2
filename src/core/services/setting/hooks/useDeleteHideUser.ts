import { DELETE_hide_user } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useDeleteHideUser = () => {
  return useMutation({
    mutationKey: [DELETE_hide_user.name],
    mutationFn: DELETE_hide_user,
  });
};
