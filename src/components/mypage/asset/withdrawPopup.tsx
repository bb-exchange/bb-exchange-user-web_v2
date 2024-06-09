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
                <input {...useMypageAsset.register("name", { required: true, disabled: true })} />
              </div>
            </li>
            <li>
              <label className={styles.label}>주민등록번호</label>
              <div className={cn(styles.inputBox, styles.disabled)}>
                <input
                  {...useMypageAsset.register("birthDate", { required: true, disabled: true })}
                  className={styles.birthdate}
                />
                <span className={styles.dash}>-</span>
                <input
                  {...useMypageAsset.register("genderCode", { required: true, disabled: true })}
                  className={styles.gendercode}
                />
                <span className={styles.dot}> ● ● ● ● ● ●</span>
              </div>
            </li>

            <li>
              <label className={styles.label}>수입금 출금 계좌</label>
              <div className={cn(styles.selectBox, styles.disabled)}>
                <select
                  {...useMypageAsset.register("bankCode", { required: true, disabled: true })}
                >
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
                <input
                  {...useMypageAsset.register("bankAccountNumber", {
                    required: true,
                    disabled: true,
                  })}
                />
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
