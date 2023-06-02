import styles from "./index.module.scss";
import IconArrow from "../../../../public/assets/icons/ArrowRight.svg";
import IconCaution from "../../../../public/assets/icons/Caution.svg";
import { useEffect, useState } from "react";
import ErrorMsgPopup from ".src/components/common/errorMsgPopup";
import PopupBg from ".src/components/common/popupBg";
import TextPopup from ".src/components/common/textPopup";
import {
  AGREEMENT_OF_MARKETING_ACCEPTANCE,
  AGREEMENT_OF_PAYMENT,
  POLICY_OF_PERSONAL_INFO,
  TERMS_OF_SERVICE,
} from ".src/data/terms-agreement/D_terms";
import { useRouter } from "next/router";

const TermsAgreement = () => {
  const router = useRouter();
  const [openCautionPopUp, setOpenCautionPopUp] = useState(false);
  const [openTerm, setOpenTerm] = useState<string>("");
  const [openTextPopUp, setOpenTextPopUp] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState<string[]>([]);
  const handleAllcheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedInputs([
        "check_1",
        "check_2",
        "check_3",
        "check_4",
        "check_5",
        id,
      ]);
    } else {
      setCheckedInputs([]);
    }
  };
  const handleCheckbox = (checked: boolean, id: string) => {
    if (checked) {
      if (checkedInputs.length === 4) {
        setCheckedInputs([
          "check_1",
          "check_2",
          "check_3",
          "check_4",
          "check_5",
          "check_all",
        ]);
      } else {
        setCheckedInputs([...checkedInputs, id]);
      }
    } else {
      if (checkedInputs.length === 6) {
        setCheckedInputs(
          checkedInputs.filter((el) => el !== id && el !== "check_all")
        );
      } else {
        setCheckedInputs(checkedInputs.filter((el) => el !== id));
      }
    }
  };

  const btnActive =
    (checkedInputs.length === 4 &&
      !checkedInputs.includes("check_all") &&
      !checkedInputs.includes("check_5")) ||
    checkedInputs.includes("check_all");

  const handleTextPopup = () => {
    if (openTerm === "termsOfService") {
      return {
        title: "서비스 이용약관",
        text: TERMS_OF_SERVICE,
      };
    } else if (openTerm === "policyOfPersonalInfo") {
      return {
        title: "개인정보 처리방침",
        text: POLICY_OF_PERSONAL_INFO,
      };
    } else if (openTerm === "agreementOfPayment") {
      return {
        title: "구매조건 확인 및 결제 진행 동의",
        text: AGREEMENT_OF_PAYMENT,
      };
    } else if (openTerm === "agreementOfMarketing") {
    }
    return {
      title: "마케팅 정보 수신 동의",
      text: AGREEMENT_OF_MARKETING_ACCEPTANCE,
    };
  };
  console.log(router.query.from);

  const linkTo = () => {
    if (btnActive) {
      if (router.query.from === "kakao") {
        router.push("/auth/register");
      } else {
        router.push("/auth/mobile-authentication");
      }
    } else {
      return undefined;
    }
  };

  return (
    <div id={styles.termsAgreement} className={styles.container}>
      <div className={styles.contentBox}>
        <p className={styles.title}>서비스 이용동의</p>
        <ul>
          <li className={styles.allAgreement}>
            <section>
              <input
                id={"check_all"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleAllcheck(e.target.checked, "check_all");
                }}
                checked={checkedInputs.includes("check_all") ? true : false}
              />
              <label htmlFor="check_all">약관 전체 동의</label>
            </section>
          </li>
          <div className={styles.division}></div>
          <li className={styles.overAge}>
            <section>
              <input
                id={"check_1"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.checked, "check_1");
                }}
                checked={checkedInputs.includes("check_1") ? true : false}
              />
              <label htmlFor="check_1">(필수) 만 14세 이상입니다.</label>
            </section>
            <IconCaution
              className={styles.iconCaution}
              onClick={() => setOpenCautionPopUp(true)}
            />
          </li>
          <li>
            <section>
              <input
                id={"check_2"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.checked, "check_2");
                }}
                checked={checkedInputs.includes("check_2") ? true : false}
              />
              <label htmlFor="check_2">(필수) 서비스 이용 약관</label>
            </section>
            <section
              className={styles.iconWrap}
              onClick={() => {
                setOpenTextPopUp(true);
                setOpenTerm("termsOfService");
              }}
            >
              <IconArrow />
            </section>
          </li>
          <li>
            <section>
              <input
                id={"check_3"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.checked, "check_3");
                }}
                checked={checkedInputs.includes("check_3") ? true : false}
              />
              <label htmlFor="check_3">(필수) 개인정보 처리방침</label>
            </section>
            <section
              className={styles.iconWrap}
              onClick={() => {
                setOpenTextPopUp(true);
                setOpenTerm("policyOfPersonalInfo");
              }}
            >
              <IconArrow />
            </section>
          </li>
          <li>
            <section>
              <input
                id={"check_4"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.checked, "check_4");
                }}
                checked={checkedInputs.includes("check_4") ? true : false}
              />
              <label htmlFor="check_4">
                (필수) 구매조건 확인 및 결제 진행 동의
              </label>
            </section>
            <section
              className={styles.iconWrap}
              onClick={() => {
                setOpenTextPopUp(true);
                setOpenTerm("agreementOfPayment");
              }}
            >
              <IconArrow />
            </section>
          </li>
          <li>
            <section>
              <input
                id={"check_5"}
                className={styles.check}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.checked, "check_5");
                }}
                checked={checkedInputs.includes("check_5") ? true : false}
              />
              <label htmlFor="check_5">(선택) 마케팅 정보 수신 동의</label>
            </section>
            <section
              className={styles.iconWrap}
              onClick={() => {
                setOpenTextPopUp(true);
                setOpenTerm("agreementOfMarketing");
              }}
            >
              <IconArrow />
            </section>
          </li>
        </ul>

        <button className={btnActive ? styles.active : ""} onClick={linkTo}>
          다음
        </button>
      </div>

      {openCautionPopUp && (
        <>
          <ErrorMsgPopup
            msg={
              <>
                <span>비법거래소는 만 14세 이상만</span>
                <span>회원가입이 가능합니다</span>
              </>
            }
            confirmFunc={() => setOpenCautionPopUp(false)}
          />
          <PopupBg bg off={() => setOpenCautionPopUp(false)} />
        </>
      )}
      {openTextPopUp && (
        <>
          <TextPopup
            content={handleTextPopup()}
            confirmFunc={() => setOpenTextPopUp(false)}
          />
          <PopupBg bg off={() => setOpenTextPopUp(false)} />
        </>
      )}
    </div>
  );
};

export default TermsAgreement;

export function getStaticProps() {
  return { props: { navBar: true } };
}
