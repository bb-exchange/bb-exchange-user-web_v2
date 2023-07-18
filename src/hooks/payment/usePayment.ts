import { RequestPayParams, RequestPayResponse } from ".src/types/imp";

export default function usePayment() {
  const requestPayment = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별(초기화) */
    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IMPORT_CODE); // 가맹점 식별코드

    /* 2. 결제 데이터 정의 */
    const data: RequestPayParams = {
      pg: "nice_v2.nictest04m", //PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: "테스트입니다.", // 주문명
      buyer_name: "조비법", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    /* 4. 결제 창 호출 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  return { requestPayment };
}
