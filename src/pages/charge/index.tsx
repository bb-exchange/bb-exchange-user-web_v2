import styles from "./charge.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import UseCharge from ".src/hooks/charge/useCharge";
import PcircleBlue from ".assets/icons/PcircleBlue.svg";
import usePayment from ".src/hooks/payment/usePayment";
import { D_chargeNoticeList } from ".src/data/charge/D_charge";

export default function Charge() {
  const useCharge = UseCharge();
  const { requestPayment } = usePayment();

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
                {Intl.NumberFormat().format(999999)} P
              </h2>
            </div>
          </div>

          <ul className={styles.chargeList}>
            {useCharge.chargeList.map((v, i) => (
              <li key={i}>
                <div className={styles.leftBox}>
                  <PcircleBlue />

                  <p className={styles.amount}>
                    {Intl.NumberFormat().format(v)}
                  </p>
                </div>

                <div className={styles.rightBox}>
                  <button className={styles.chargeBtn} onClick={requestPayment}>
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
    </>
  );
}
