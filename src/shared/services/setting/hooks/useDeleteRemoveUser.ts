import { DELETE_remove_user } from "../api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRemoveUser = () => {
  return useMutation({
    mutationKey: [DELETE_remove_user.name],
    mutationFn: DELETE_remove_user,
  });
};
