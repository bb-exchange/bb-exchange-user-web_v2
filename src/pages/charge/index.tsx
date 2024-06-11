import styles from "./charge.module.scss";

import PcircleBlue from ".assets/icons/PcircleBlue.svg";
import { confirmPayments, ConfirmPaymentsRequest, preparePayments } from ".src/api/point";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import { D_chargeNoticeList } from ".src/data/charge/D_charge";
import UseCharge from ".src/hooks/charge/useCharge";
import useGetMyProfile from ".src/hooks/common/useGetProfile";
import usePayment from ".src/hooks/payment/usePayment";
import { RequestPayResponse } from ".src/types/imp";
import { useMutation } from "@tanstack/react-query";

import { CommonPopup } from "@components/common/popup/CommonPopup";

export default function Charge() {
  const useCharge = UseCharge();
  const { requestPayment } = usePayment();
  const { profile, refetch } = useGetMyProfile();

  const { mutateAsync: postConfirmPayments } = useMutation({
    mutationFn: confirmPayments,
  });

  const { mutateAsync: postPreparePayment } = useMutation({
    mutationFn: preparePayments,
  });

  const preparePayment = async (price: number) => {
    // 결제 사전 준비
    const { paymentTxId } = await postPreparePayment({
      currentUserId: profile.userId,
      store: "PORTONE",
      amount: price,
    });

    // IMPORT 결제 모듈 호출
    requestPayment(paymentTxId, price, (response: RequestPayResponse) =>
      successCallback(paymentTxId, response, price),
    );
  };

  const successCallback = async (
    paymentTxId: string,
    response: RequestPayResponse,
    price: number,
  ) => {
    const { imp_uid, merchant_uid, error_msg } = response;

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

      alert(error_msg);
    }

    const { status } = await postConfirmPayments({
      currentUserId: profile.userId,
      request,
    });

    if (status === "SUCCESS") {
      refetch();

      useCharge.setResultPopupInfo((prev) => ({
        ...prev,
        isShow: true,
        title: `결제가 <span class='color-primary1'>완료</span>되었습니다.`,
        subTitle: `구매 포인트 <span class='p1 bold color-primary1'>${Intl.NumberFormat().format(price)} P</span>`,
        confirmText: "계속 이용하기",
      }));
    } else {
      useCharge.setResultPopupInfo((prev) => ({
        ...prev,
        isShow: true,
        title: `결제 승인에 <span class='color-red1'>실패</span>했습니다.`,
        subTitle: `확인 후 다시 시도해주세요.`,
        confirmText: "확인",
      }));
    }
  };

  return (
    <>
      <CommonHeader />

      <main className={styles.chargeMain}>
        <section className={styles.chargeSec}>
          <h1 className={styles.pageTitle}>포인트 충전</h1>

          <div className={styles.topBar}>
            <div className={styles.pointBox}>
              <p className={styles.key}>현재 보유 포인트</p>

              <h2 className={styles.value}>
                {profile ? Intl.NumberFormat().format(profile.balance) : 0} P
              </h2>
            </div>
          </div>

          <ul className={styles.chargeList}>
            {useCharge.chargeList.map((v, i) => (
              <li key={i}>
                <div className={styles.leftBox}>
                  <PcircleBlue />

                  <p className={styles.amount}>{Intl.NumberFormat().format(v)}</p>
                </div>
                <div className={styles.rightBox}>
                  <button className={styles.chargeBtn} onClick={() => preparePayment(v)}>
                    <p>{Intl.NumberFormat().format(v)}원</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.noticeSec}>
          <h2 className={styles.noticeTitle}>유의사항</h2>

          <ul className={styles.noticeList}>
            {D_chargeNoticeList.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </section>
      </main>

      <CommonFooter />

      {/* 결제 결과 팝업 */}
      {useCharge.resultPopupInfo.isShow && (
        <CommonPopup
          title={useCharge.resultPopupInfo.title}
          subTitle={useCharge.resultPopupInfo.subTitle}
          confirmFunc={() =>
            useCharge.setResultPopupInfo((prev) => ({
              ...prev,
              isShow: false,
            }))
          }
          confirmText={useCharge.resultPopupInfo.confirmText}
        />
      )}
    </>
  );
}
