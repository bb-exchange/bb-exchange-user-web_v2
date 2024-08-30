type Store = "PORTONE" | "APPLE" | "GOOGLE" | "MOCK";
type PaymentStatus = "READY" | "SUCCESS" | "FAIL";

export interface PostPreparePaymentRequest {
  store: Store;
  amount: number;
}

export interface PostPreparePaymentResponse {
  paymentTxId: string;
  requestId: number;
}

export interface PostConfirmPaymentRequest {
  store: Store;
  storeTxId: string;
  paymentTxId: string;
  isSuccess: boolean;
  token: string;
  productId: string;
  receiptData: string;
  appleFailReason: string;
}

export interface PostConfirmPaymentResponse {
  status: PaymentStatus;
}

export interface PostCanclePaymentRequest {
  store: Store;
  paymentTxId: string;
}

export interface PostCanclePaymentResponse {
  paymentTxId: string;
  amount: number;
  balance: number;
}
