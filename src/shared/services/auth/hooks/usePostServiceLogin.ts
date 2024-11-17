import { POST_service_login } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostServiceLogin = () => {
  return useMutation({
    mutationKey: [POST_service_login.name],
    mutationFn: POST_service_login,
  });
};
