import styles from "./withdrawInfoPopup.module.scss";
import X from ".assets/icons/X.svg";
import ChevronDn from ".assets/icons/ChevronDn.svg";
import useWithdrawInfoPopup from ".src/hooks/mypage/asset/useWithdrawInfoPopup";
import ImgErrorMsgPopup from ".src/components/common/popup/imgErrorMsgPopup";
import PopupBg from ".src/components/common/popupBg";

interface Iprops {
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function WithdrawPopup({ off }: Iprops) {
  const prop = useWithdrawInfoPopup();

  return (
    <section className={styles.withdrawPopup}>
      <article className={styles.topBar}>
        <span className={styles.blank} />
        <h1 className={styles.popupTitle}>출금 정보 입력</h1>
        <button className={styles.exitBtn} onClick={off}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <form onSubmit={prop.handleSubmit(prop.onSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <p className={styles.key}>실명</p>

              <div className={styles.valueBox}>
                <div className={styles.inputBox}>
                  <input {...prop.register("name")} />
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>주민등록번호</p>

              <div className={styles.valueBox}>
                <div className={styles.inputBox}>
                  <input
                    // type="number"
                    {...prop.register("accountNumber")}
                    placeholder={`생년월일 6자리  -  ● ● ● ● ● ● ●`}
                    maxLength={13}
                    defaultValue={""}
                    // value={maskingAccountNum}
                  />
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>수입금 출금 은행</p>

              <div className={styles.valueBox}>
                <button className={styles.selBox}>
                  <p className={styles.value}>
                    {/* {useWithdrawPopup.watch("bank")} */}
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
                    {/* {useWithdrawPopup.getAccountNumber()} */}
                  </p>
                </div>
              </div>
            </li>

            <li>
              <p className={styles.key}>출금 신청 수익금</p>

              <div className={styles.valueBox}>
                <div
                  className={styles.inputBox}
                  // onClick={() => useWithdrawPopup.setFocus("amount")}
                >
                  <p className={styles.value}>
                    {/* {Intl.NumberFormat().format(
                      useWithdrawPopup.watch("amount") || 0
                    )} */}
                    원
                  </p>

                  <input
                    type="number"
                    className={styles.hidden}
                    // {...useWithdrawPopup.register("amount")}
                  />
                </div>
              </div>
            </li>
          </ul>

          <button className={styles.submitBtn} onClick={prop.onClickDraw}>
            출금신청
          </button>
        </form>
      </article>
    </section>
  );
}
