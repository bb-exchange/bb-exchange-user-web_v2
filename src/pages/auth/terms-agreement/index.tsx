import styles from "./index.module.scss";
import IconArrow from "../../../../public/assets/icons/ArrowRight.svg";
import IconCaution from "../../../../public/assets/icons/Caution.svg";
import { useEffect, useState } from "react";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import PopupBg from ".src/components/common/popupBg";
import TextPopup from ".src/components/common/popup/textPopup";
import { useRouter } from "next/router";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import { ITerms, postTermsAgreement } from ".src/api/auth/terms";
import { useCookies } from "react-cookie";

const TermsAgreement = () => {
  const router = useRouter();
  const [checkedInputs, setCheckedInputs] = useState<string[]>([]);
  const [openCautionPopUp, setOpenCautionPopUp] = useState(
    router.query.openCautionPopUp === "true" || false
  );
  const [openTerm, setOpenTerm] = useState<string>("");
  const [openTextPopUp, setOpenTextPopUp] = useState(
    router.query.openTextPopUp === "true" || false
  );
  const [openConsentPopup, setOpenConsentPopup] = useState(false);
  const [openRefusePopup, setOpenRefusePopup] = useState(false);

  const [cookie] = useCookies(["oauthId", "oauthType"]);

  const btnActive =
    (checkedInputs.length === 3 &&
      !checkedInputs.includes("check_all") &&
      !checkedInputs.includes("check_4")) ||
    checkedInputs.length === 4 ||
    checkedInputs.includes("check_all");

  //FC
  const handleAllcheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedInputs(["check_1", "check_2", "check_3", "check_4", id]);
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
          "check_all",
        ]);
      } else {
        setCheckedInputs([...checkedInputs, id]);
      }
    } else {
      if (checkedInputs.length === 5) {
        setCheckedInputs(
          checkedInputs.filter((el) => el !== id && el !== "check_all")
        );
      } else {
        setCheckedInputs(checkedInputs.filter((el) => el !== id));
      }
    }
  };

  const handleClickBtn = () => {
    if (btnActive) {
      const data: ITerms = {
        oauthType: cookie?.oauthType,
        oauthId: cookie?.oauthId,
        agreeToMarketingInfo: checkedInputs?.includes("check_4"),
      };
      //request API
      postTermsAgreement(data).then(({ data: { data } }) => {
        if (data.status === "AGREE_TO_SERVICE_TERM") {
          if (router.query.status === "phoneVerified") {
            router.push("/auth/register");
          } else {
            router.push("/auth/mobile-authentication");
          }
        } else {
          return undefined;
        }
      });
    }
  };

  //마케팅 정보수신 동의 팝업
  const handlePopup = (e: any) => {
    let checked = e.target.checked;
    if (checked) {
      setOpenConsentPopup(true);
    } else {
      setOpenRefusePopup(true);
    }
  };
  const storage = globalThis?.sessionStorage;
  useEffect(() => {
    const prevPath = storage.getItem("prevPath") as string;
    const termsCheckList = JSON.parse(
      storage.getItem("termsCheckList") as string
    );
    if (
      (prevPath === "/auth/terms-agreement/service" ||
        prevPath === "/auth/terms-agreement/privacy") &&
      termsCheckList
    ) {
      setCheckedInputs(termsCheckList);
    } else {
      setCheckedInputs([]);
    }
  }, []);

  return (
    <div id={styles.termsAgreement} className={styles.container}>
      <div className={styles.contentBox}>
        <p className={styles.title}>서비스 이용동의</p>
        <ul className={styles.wrapList}>
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
                router.push({
                  pathname: "/auth/terms-agreement/[type]",
                  query: { type: "service" },
                });
                storage.setItem(
                  "termsCheckList",
                  JSON.stringify(checkedInputs)
                );
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
                router.push({
                  pathname: "/auth/terms-agreement/[type]",
                  query: { type: "privacy" },
                });
                storage.setItem(
                  "termsCheckList",
                  JSON.stringify(checkedInputs)
                );
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
                  handlePopup(e);
                }}
                checked={checkedInputs.includes("check_4") ? true : false}
              />
              <label htmlFor="check_4">(선택) 마케팅 정보 수신 동의</label>
            </section>
            {/* <section className={styles.iconWrap}>
              <IconArrow />
            </section> */}
          </li>
        </ul>

        <button
          className={btnActive ? styles.active : ""}
          onClick={handleClickBtn}
        >
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

      {openConsentPopup && (
        <>
          <ConfirmPopup
            title="마케팅 정보 수신에 동의하시겠습니까?"
            content={
              <>
                <span>푸시 알림 및 문자 메세지를 통해</span>
                <br />
                <span>
                  회원님께 쿠폰, 할인 헤택 등 마케팅 정보를
                  <br />
                  전송하려고 합니다.
                </span>
              </>
            }
            cancelFunc={() => {
              setOpenConsentPopup(false);
              setCheckedInputs(
                checkedInputs.filter((ele) => ele !== "check_4")
              );
            }}
            confirmFunc={() => {
              setOpenConsentPopup(false);
            }}
          />
          <PopupBg
            bg
            off={() => {
              setOpenConsentPopup(false);
              setCheckedInputs(
                checkedInputs.filter((ele) => ele !== "check_4")
              );
            }}
          />
        </>
      )}
      {openRefusePopup && (
        <>
          <ErrorMsgPopup
            msg={"마케팅 정보 수신이 거부되었습니다."}
            subMsg={
              <>
                광고성 정보 수신 동의는 설정 {`>`} 알림에서
                <br />
                변경 가능합니다
              </>
            }
            confirmFunc={() => setOpenRefusePopup(false)}
          />
          <PopupBg bg off={() => setOpenRefusePopup(false)} />
        </>
      )}
    </div>
  );
};

export default TermsAgreement;

export const getStaticProps = () => {
  return {
    props: {
      navBar: true,
    },
    revalidate: 10,
  };
};
