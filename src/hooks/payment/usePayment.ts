import { ConfirmPaymentsRequest, confirmPayments } from ".src/api/point";
import { profileState, userNameState } from ".src/recoil";
import { RequestPayParams, RequestPayResponse } from ".src/types/imp";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export default function usePayment() {
  const profile = useRecoilValue(profileState);

  const { mutateAsync: postConfirmPayments } = useMutation({
    mutationFn: confirmPayments,
  });

  const requestPayment = (
    paymentTxId: string,
    amount: number,
    callback: (response: RequestPayResponse) => void
  ) => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별(초기화) */
    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IMPORT_CODE); // 가맹점 식별코드

    const merchant_uid = `mid_${new Date().getTime()}`; // 주문번호

    /* 2. 결제 데이터 정의 */
    const data: RequestPayParams = {
      pg: "nice_v2.IM0015589m", // PG사 상점ID
      pay_method: "card", // 결제수단
      merchant_uid, // 주문번호
      amount, // 결제금액
      name: "비법거래소 포인트", // 주문명
      buyer_name: `${profile.nickname || ""}`, // 구매자 이름
      buyer_tel: "", // 구매자 전화번호
      // buyer_email: "", // 구매자 이메일
      // buyer_addr: "", // 구매자 주소
      // buyer_postcode: "", // 구매자 우편번호
    };

    /* 4. 결제 창 호출 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의 */
  async function callback(paymentTxId: string, response: RequestPayResponse) {
    const { imp_uid, merchant_uid, error_msg } = response;
    console.log(response);
    console.log(paymentTxId);

    // {imp_uid: 'imp_625921322418', merchant_uid: 'mid_1713545921075'}

    let request: ConfirmPaymentsRequest = {
      store: "PORTONE",
      paymentTxId, // prepare 단계에서 채번한 내부 거래 번호
      isSuccess: false,
      appleFailReason: "",
    };

    if (!!imp_uid) {
      request = {
        ...request,
        storeTxId: imp_uid,
        isSuccess: true,
      };
    } else {
      request = {
        ...request,
        isSuccess: false,
        appleFailReason: error_msg,
      };
    }

    const { status } = await postConfirmPayments({
      currentUserId: profile.userId,
      request,
    });

    if (status === "SUCCESS") {
    }
  }
  return { requestPayment };
}
