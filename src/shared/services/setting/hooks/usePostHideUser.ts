import { POST_hide_user } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostHideUser = () => {
  return useMutation({
    mutationKey: [POST_hide_user.name],
    mutationFn: POST_hide_user,
  });
};
