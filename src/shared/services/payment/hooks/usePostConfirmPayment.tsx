import { POST_confirm_payment } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostConfirmPayment = () => {
  return useMutation({
    mutationKey: [POST_confirm_payment.name],
    mutationFn: POST_confirm_payment,
  });
};
