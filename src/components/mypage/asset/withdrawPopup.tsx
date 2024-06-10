import styles from "./withdrawInfoPopup.module.scss";

import cn from "classnames";

import X from "@assets/icons/X.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

interface WithdrawPopupProps {
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function WithdrawPopup({ useMypageAsset, off }: WithdrawPopupProps) {
  return (
    <section className={styles.withdrawPopup}>
      <article className={styles.topBar}>
        <span className={styles.blank} />
        <h1 className={styles.popupTitle}>출금하기</h1>
        <button className={styles.exitBtn} onClick={off}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <form onSubmit={useMypageAsset.handleSubmit(useMypageAsset.onApplyWithdrawSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <label className={styles.label}>실명</label>
              <div className={cn(styles.inputBox, styles.disabled)}>
                <input value={useMypageAsset.getValues("name")} disabled />
              </div>
            </li>
            <li>
              <label className={styles.label}>주민등록번호</label>
              <div className={cn(styles.inputBox, styles.disabled)}>
                <input
                  value={useMypageAsset.getValues("birthDate")}
                  disabled
                  className={styles.birthdate}
                />
                <span className={styles.dash}>-</span>
                <input
                  value={useMypageAsset.getValues("genderCode")}
                  disabled
                  className={styles.gendercode}
                />
                <span className={styles.dot}> ● ● ● ● ● ●</span>
              </div>
            </li>

            <li>
              <label className={styles.label}>수입금 출금 계좌</label>
              <div className={cn(styles.selectBox, styles.disabled)}>
                <select value={useMypageAsset.getValues("bankCode")} disabled>
                  <option value="">선택</option>
                  {useMypageAsset.banks?.data.map(
                    ({ code, name }: { code: string; name: string }) => {
                      return (
                        <option value={code} key={code}>
                          {name}
                        </option>
                      );
                    },
                  )}
                </select>
                <input value={useMypageAsset.getValues("bankAccountNumber")} disabled />
              </div>
            </li>
            <li>
              <label className={styles.label}>출금 신청 수익금</label>

              <div className={cn(styles.inputBox, styles.suffix)}>
                <input
                  onChange={useMypageAsset.onChange}
                  value={useMypageAsset.changePointValue.toLocaleString()}
                  onBlur={useMypageAsset.onBlur}
                />
              </div>
            </li>
          </ul>

          <ContainedBtn text="출금신청" />
        </form>
      </article>
    </section>
  );
}
