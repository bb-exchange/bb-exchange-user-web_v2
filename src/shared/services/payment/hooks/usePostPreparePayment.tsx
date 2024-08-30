import { POST_prepare_payment } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostPreparePayment = () => {
  return useMutation({
    mutationKey: [POST_prepare_payment.name],
    mutationFn: POST_prepare_payment,
  });
};
