import { POST_hide_user, POST_hide_user_req_res_temp } from "../api";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostHideUser = () => {
  return useMutation({
    mutationKey: [POST_hide_user_req_res_temp.name],
    mutationFn: POST_hide_user_req_res_temp,
  });
};
