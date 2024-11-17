import { POST_google_login } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostGoogleLogin = () => {
  return useMutation({
    mutationKey: [POST_google_login.name],
    mutationFn: POST_google_login,
  });
};
