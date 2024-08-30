import { Post } from "../services";

import {
  PostCanclePaymentRequest,
  PostCanclePaymentResponse,
  PostConfirmPaymentRequest,
  PostConfirmPaymentResponse,
  PostPreparePaymentRequest,
  PostPreparePaymentResponse,
} from "@/shared/types/paymentType";

/** 결제 사전 준비 요청  */
export const POST_prepare_payment = async (request: PostPreparePaymentRequest) => {
  const { data } = await Post<PostPreparePaymentResponse>("/v1/payments/prepare", request, {
    requireToken: true,
  });
  return data.data;
};

/** 결제 확인 */
export const POST_confirm_payment = async (request: PostConfirmPaymentRequest) => {
  const { data } = await Post<PostConfirmPaymentResponse>("/v1/payments/confirm", request, {
    requireToken: true,
  });
  return data.data;
};

/** 결제 취소 */
export const POST_cancle_payment = async (request: PostCanclePaymentRequest) => {
  const { data } = await Post<PostCanclePaymentResponse>("/v1/payments/confirm", request, {
    requireToken: true,
  });
  return data.data;
};
