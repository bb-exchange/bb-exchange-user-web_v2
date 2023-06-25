import styles from "./withdrawPopup.module.scss";
import X from ".assets/icons/X.svg";
import ChevronDn from ".assets/icons/ChevronDn.svg";

interface Iprops {
  useWithdrawPopup: { [key: string]: any };
}

export default function WithdrawPopup({ useWithdrawPopup }: Iprops) {
  return (
    <section className={styles.withdrawPopup}>
      <article className={styles.topBar}>
        <span className={styles.blank} />
        <h1 className={styles.popupTitle}>출금하기</h1>
        <button
          className={styles.exitBtn}
          onClick={() => useWithdrawPopup.setWithdrawPopup(false)}
        >
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <form onSubmit={useWithdrawPopup.handleSubmit}>
          <ul className={styles.inputList}>
            <li>
              <p className={styles.key}>실명</p>

              <div className={styles.valueBox}>
                <div className={styles.inputBox}>
                  <input {...useWithdrawPopup.register("name")} disabled />
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>주민등록번호</p>

              <div className={styles.valueBox}>
                <div className={styles.inputBox}>
                  <p className={styles.value}>
                    {useWithdrawPopup.getRegistNumStr()}
                  </p>
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>수입금 출금 은행</p>

              <div className={styles.valueBox}>
                <button className={styles.selBox}>
                  <p className={styles.value}>
                    {useWithdrawPopup.watch("bank")}
                  </p>

                  <ChevronDn />
                </button>
              </div>
            </li>

            <li>
              <p className={styles.key}>수입금 출금 계좌</p>

              <div className={styles.valueBox}>
                <div className={styles.inputBox}>
                  <p className={styles.value}>
                    {useWithdrawPopup.getAccountNumber()}
                  </p>
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>출금 신청 수익금</p>

              <div className={styles.valueBox}>
                <div
                  className={styles.inputBox}
                  onClick={() => useWithdrawPopup.setFocus("amount")}
                >
                  <p className={styles.value}>
                    {Intl.NumberFormat().format(
                      useWithdrawPopup.watch("amount") || 0
                    )}
                    원
                  </p>

                  <input
                    type="number"
                    className={styles.hidden}
                    {...useWithdrawPopup.register("amount")}
                  />
                </div>
              </div>
            </li>
          </ul>

          <button className={styles.submitBtn} onClick={() => {}}>
            출금신청
          </button>
        </form>
      </article>
    </section>
  );
}
