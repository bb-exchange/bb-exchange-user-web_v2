import { POST_cancle_payment } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostCanclePayment = () => {
  return useMutation({
    mutationKey: [POST_cancle_payment.name],
    mutationFn: POST_cancle_payment,
  });
};
