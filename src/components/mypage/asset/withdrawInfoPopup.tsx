import styles from "./withdrawInfoPopup.module.scss";

import ChevronDn from "@assets/icons/ChevronDn.svg";
import X from "@assets/icons/X.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";

import useWithdrawInfoPopup from "@hooks/mypage/asset/useWithdrawInfoPopup";

interface Iprops {
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function WithdrawPopup({ off }: Iprops) {
  const prop = useWithdrawInfoPopup();

  return (
    <section className={styles.withdrawPopup}>
      <div className={styles.topBar}>
        <span className={styles.blank} />
        <h1 className={styles.popupTitle}>출금 정보 입력</h1>
        <button className={styles.exitBtn} onClick={off}>
          <X />
        </button>
      </div>

      <article className={styles.contArea}>
        <form onSubmit={prop.handleSubmit(prop.onSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <label className={styles.label}>실명</label>
              <div className={styles.inputBox}>
                <input {...prop.register("name")} placeholder="이름" />
              </div>
            </li>
            <li>
              <label className={styles.label}>주민등록번호</label>
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
            </li>
            <li>
              <label className={styles.label}>휴대폰 번호</label>
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
            </li>
          </ul>

          <ContainedBtn text="출금신청" onClick={prop.onClickDraw} />
        </form>
      </article>
    </section>
  );
}
