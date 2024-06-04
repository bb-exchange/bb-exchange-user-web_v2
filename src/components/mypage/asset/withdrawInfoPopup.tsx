import styles from "./withdrawInfoPopup.module.scss";

import Caution from "@assets/icons/RedCaution.svg";
import X from "@assets/icons/X.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";

import useWithdrawInfoPopup from "@hooks/mypage/asset/useWithdrawInfoPopup";

interface Iprops {
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function WithdrawPopup({ off }: Iprops) {
  const prop = useWithdrawInfoPopup();
  console.log("telecoms ", prop.banks, prop.telecoms);
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
              <div className={styles.selectBox}>
                <select name="" id="">
                  {prop.telecoms?.data.map(
                    ({ code, telecom }: { code: string; telecom: string }) => {
                      return (
                        <option value={code} key={code}>
                          {telecom}
                        </option>
                      );
                    },
                  )}
                </select>
                <input
                  {...prop.register("phoneNumber")}
                  placeholder="휴대폰 번호"
                  maxLength={11}
                  defaultValue={""}
                />
              </div>
            </li>
            <li>
              <label className={styles.label}>수익금 출금 계좌</label>
              <div className={styles.selectBox}>
                <select name="" id="">
                  {prop.banks?.data.data.map(({ code, name }: { code: string; name: string }) => {
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <input {...prop.register("phoneNumber")} placeholder="계좌번호" />
              </div>
              <span className={styles.subDescription}>
                <Caution />
                가상 계좌번호는 지정할 수 없습니다.
              </span>
            </li>
          </ul>
          <ContainedBtn text="출금신청" onClick={prop.onClickDraw} />
        </form>
      </article>
    </section>
  );
}
