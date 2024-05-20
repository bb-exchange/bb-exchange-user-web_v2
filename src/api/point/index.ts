import { basicInstance } from "../instance";

type PreparePaymentsParams = {
  currentUserId: number;
  store: string;
  amount: number;
};

type PreparePaymentsResponse = {
  data: {
    data: {
      paymentTxId: string;
      requestId: number;
    };
  };
};

type ConfirmPaymentsParams = {
  currentUserId: number;
  request: ConfirmPaymentsRequest;
};

export type ConfirmPaymentsRequest = {
  store: string;
  storeTxId?: string | null;
  paymentTxId: string;
  isSuccess: boolean;
  token?: string;
  productId?: string;
  receiptData?: string;
  appleFailReason?: string;
};

type ConfirmPaymentsResponse = {
  data: {
    data: {
      status: "READY" | "SUCCESS" | "FAIL";
    };
  };
};

export const preparePayments = async ({ currentUserId, store, amount }: PreparePaymentsParams) => {
  return basicInstance
    .post(
      "/v1/payments/prepare",
      {
        store,
        amount,
      },
      {
        params: {
          currentUserId,
        },
      },
    )
    .then(({ data: { data } }: PreparePaymentsResponse) => data);
};

export const confirmPayments = async ({ currentUserId, request }: ConfirmPaymentsParams) => {
  return basicInstance
    .post("/v1/payments/confirm", request, {
      params: {
        currentUserId,
      },
    })
    .then(({ data: { data } }: ConfirmPaymentsResponse) => data);
};
