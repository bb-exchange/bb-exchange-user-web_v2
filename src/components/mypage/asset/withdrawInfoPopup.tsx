import styles from "./withdrawInfoPopup.module.scss";

import Caution from "@assets/icons/RedCaution.svg";
import X from "@assets/icons/X.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";

import useWithdrawInfoPopup from "@hooks/mypage/asset/useWithdrawInfoPopup";

import { onHandlePhoneRegex } from "@utils/regex";

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
                  {...prop.register("birthDate", {
                    onChange: (e) => {
                      // TODO: 소수점 입력 안되게 예외처리
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value.length >= 6) prop.setFocus("genderCode");
                    },
                  })}
                  placeholder="생년월일 6자리"
                  className={styles.birthdate}
                  maxLength={6}
                />
                <span className={styles.dash}>-</span>
                <input
                  {...prop.register("genderCode", {
                    onChange: (e) => {
                      if (e.target.value.length > 0) prop.setFocus("telecomCode");
                    },
                  })}
                  className={styles.gendercode}
                  maxLength={1}
                  placeholder="●"
                />
                <span className={styles.dot}> ● ● ● ● ● ●</span>
              </div>
            </li>
            <li>
              <label className={styles.label}>휴대폰 번호</label>
              <div className={styles.selectBox}>
                <select {...prop.register("telecomCode")}>
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
                  {...prop.register("phoneNumber", {
                    onChange: (e) => {
                      const value = onHandlePhoneRegex(e.target.value);
                      prop.setValue("phoneNumber", value);
                    },
                  })}
                  placeholder="휴대폰 번호"
                />
              </div>
            </li>
            <li>
              <label className={styles.label}>수익금 출금 계좌</label>
              <div className={styles.selectBox}>
                <select {...prop.register("bankCode")}>
                  {prop.banks?.data.data.map(({ code, name }: { code: string; name: string }) => {
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <input {...prop.register("bankAccountNumber")} placeholder="계좌번호" />
              </div>
              <span className={styles.subDescription}>
                <Caution />
                가상 계좌번호는 지정할 수 없습니다.
              </span>
            </li>
          </ul>

          <section className={styles.submitForm}>
            <div className={styles.checkbox}>
              <input
                id={"agree_check"}
                className={styles.hiddenCheckbox}
                type="checkbox"
                onChange={(e) => {
                  prop.setAgreeCheck(e.target.checked);
                }}
                checked={prop.agreeCheck}
              />
              <label htmlFor="agree_check">(필수) 출금을 위한 개인정보 수집 동의</label>
            </div>
            <ContainedBtn text="완료" onClick={prop.onClickDraw} disabled={!prop.agreeCheck} />
          </section>
        </form>
      </article>
    </section>
  );
}
