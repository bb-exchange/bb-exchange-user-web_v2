import styles from "./withdrawInfoPopup.module.scss";

import { useEffect, useState } from "react";

import cn from "classnames";

import Caution from "@assets/icons/RedCaution.svg";
import X from "@assets/icons/X.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

interface WithdrawInfoPopupProps {
  off: React.MouseEventHandler<HTMLButtonElement>;
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
}

export default function WithdrawInfoPopup({ off, useMypageAsset: prop }: WithdrawInfoPopupProps) {
  useEffect(() => {
    prop.reset();
    prop.setAgreeCheck(false);
  }, []);
  const [modeEdit, setModeEdit] = useState(false);
  useEffect(() => {
    const validateModeEdit = prop
      .getValues(["name", "birthDate", "genderCode"])
      .every((values) => !!values);
    setModeEdit(validateModeEdit);
  }, [prop.getValues]);

  return (
    <section className={styles.withdrawPopup}>
      <div className={styles.topBar}>
        <span className={styles.blank} />
        <h1 className={styles.popupTitle}>출금 정보 {modeEdit ? "변경" : "입력"}</h1>
        <button className={styles.exitBtn} onClick={off}>
          <X />
        </button>
      </div>

      <article className={styles.contArea}>
        <form onSubmit={prop.handleSubmit(prop.onRegisterAccountNumberSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <label className={styles.label}>실명</label>
              <div className={cn(styles.inputBox, { [styles.disabled]: modeEdit })}>
                <input
                  readOnly={modeEdit}
                  {...prop.register("name", {
                    required: true,
                  })}
                  className={cn({ [styles.disabled]: modeEdit })}
                  placeholder="이름"
                />
              </div>
            </li>
            <li>
              <label className={styles.label}>주민등록번호</label>
              <div className={cn(styles.inputBox, { [styles.disabled]: modeEdit })}>
                <input
                  readOnly={modeEdit}
                  {...prop.register("birthDate", {
                    required: true,
                    onChange: (e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      prop.setValue("birthDate", value);
                      if (value.length >= 6) prop.setFocus("genderCode", { shouldSelect: true });
                    },
                  })}
                  placeholder="생년월일 6자리"
                  className={cn(styles.birthdate, { [styles.disabled]: modeEdit })}
                  maxLength={6}
                />
                <span className={styles.dash}>-</span>
                <input
                  readOnly={modeEdit}
                  {...prop.register("genderCode", {
                    required: true,
                    onChange: (e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      prop.setValue("genderCode", value);

                      if (value.length > 0) prop.setFocus("telecomCode");
                    },
                  })}
                  className={cn(styles.gendercode, { [styles.disabled]: modeEdit })}
                  maxLength={1}
                  placeholder="●"
                />
                <span className={cn(styles.dot, { [styles.dotDisabled]: modeEdit })}>
                  {" "}
                  ● ● ● ● ● ●
                </span>
              </div>
            </li>
            <li>
              <label className={styles.label}>휴대폰 번호</label>
              <div className={cn(styles.selectBox, styles.disabled)}>
                <input
                  className={styles.disabled}
                  value={prop.watch("phoneNumber")}
                  placeholder="휴대폰 번호"
                />
              </div>
              <span className={styles.subDescription}>
                <Caution />
                휴대폰 번호가 변경된 경우 고객센터로 연락주세요.
              </span>
            </li>
            <li>
              <label className={styles.label}>수익금 출금 계좌</label>
              <div className={styles.selectBox}>
                <select {...prop.register("bankCode", { required: true })}>
                  <option value="">선택</option>
                  {prop.banks?.data.map(({ code, name }: { code: string; name: string }) => {
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <input
                  {...prop.register("bankAccountNumber", { required: true })}
                  placeholder="계좌번호"
                />
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
            <ContainedBtn text="완료" disabled={!prop.agreeCheck || !prop.formState.isValid} />
          </section>
        </form>
      </article>
    </section>
  );
}
