import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import styles from "./index.module.scss";
import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import { basicInstance } from ".src/api/instance";
import OutlinedBtn from ".src/components/Buttons/OutlinedBtn";
import IconCheck from "../../../../public/assets/icons/AuthCheck.svg";
import PopupBg from ".src/components/common/popupBg";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import LocalStorage from ".src/util/localStorage";

interface Inputs {
  phoneNumber: string;
  secret: string;
}
const MobileAuth = () => {
  const { query } = useRouter();

  const [cookie, setCookie] = useCookies(["oauthId", "oauthType"]);
  const { push } = useRouter();
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeText, setTimeText] = useState<string>("");
  const [openExceedPopup, setOpenExceedPopup] = useState<boolean>(
    query?.openExceedPopup === "true" || false
  ); //일일인증횟수초과
  const [leftCount, setLeftCount] = useState<number>();
  const [openErrSecretPopup, setOpenErrSecretPopup] = useState<boolean>(
    query?.openErrSecretPopup === "true" || false
  ); //인증번호 에러
  const [openExpiredKeyPopup, setOpenExpiredKeyPopup] =
    useState<boolean>(false); //인증키 만료
  const [openErrorPopup, setOpenErrorPopup] = useState<boolean>(false);
  const [openTryKeyErrPopup, setOpenTryKeyErrPopup] = useState<boolean>(false);
  const [isTryKeyErr, setIsTryKeyErr] = useState<boolean>(false);

  const isNextBtnDisabled = useRef<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const isErrorRef = useRef<boolean>(false);
  const phoneValidRef = useRef<boolean>(true);
  phoneValidRef.current =
    watch("phoneNumber")?.match(/^[0-9]{11}$/i) && !isErrorRef.current
      ? false
      : true;

  //남은 인증 회수 더미데이터
  let leftTimes = 1;

  const [visitorId, setVisitorId] = useState<string>("");
  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
      });
  }, []);

  //send sms api
  const sendSecretCode = async (data: Inputs) => {
    try {
      setIsTryKeyErr(false);
      const {
        data: { data: secretData },
      }: any = await basicInstance.post("/v1/auth/phones/send-secret", {
        oauthType: cookie.oauthType,
        oauthId: cookie.oauthId,
        phoneNumber: data.phoneNumber,
        deviceUID: visitorId,
      });

      if (secretData.status === "SECRET_SENT") {
        //인증번호 문자 전송 완료
        setLeftCount(secretData.leftCount);
        setShowResendBtn(true);
        setMinutes(3);
        setSeconds(0);
        setValue("secret", ""); //인증번호 입력창 초기화
      } else if (secretData.oauthTypes) {
        LocalStorage.setItem("oauthType", secretData.oauthTypes[0]);
        push("/auth/duplicate-social-account");
      }
    } catch (error: any) {
      if (error.response?.data.code === "ATH010") {
        isErrorRef.current = true;
        setOpenExceedPopup(true);
      } else if (error.response?.data.code === "ATH009") {
        setOpenErrorPopup(true);
      }
    }
  };

  //휴대폰 인증 api
  const verifyPhones = async (data: Inputs) => {
    try {
      const res: any = await basicInstance.post("/v1/auth/phones/verify", {
        oauthType: cookie.oauthType,
        oauthId: cookie.oauthId,
        phoneNumber: data.phoneNumber,
        secret: data.secret,
        deviceUID: visitorId,
      });
      //인증 성공
      if (res.data.data.status === "PHONE_VERIFIED") {
        push("/auth/register");
      } else if (res.data.data.status === "ALREADY_REGISTERED") {
        //소셜 계정 중복
        setCookie("oauthId", res.data.data.oauthId, {
          path: "/",
        });
        setCookie("oauthType", res.data.data.oauthType, {
          path: "/",
        });
        push("/auth/duplicate-social-account");
      }
    } catch (error: any) {
      if (error.response?.data.code === "ATH012") {
        setOpenErrSecretPopup(true);
      }
      // else if (error.response?.data.message === "auth key not found") {
      //   setOpenExpiredKeyPopup(true);
      // }
      else if (error.response?.data.code === "ATH011") {
        setIsTryKeyErr(true);
        setOpenTryKeyErrPopup(true);
      }
    }
  };

  //timer
  useEffect(() => {
    if (showResendBtn) {
      const countdown = setInterval(() => {
        if (Number(seconds) > 0) {
          setSeconds(Number(seconds) - 1);
        }
        if (Number(seconds) === 0) {
          if (Number(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(Number(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, showResendBtn]);

  useEffect(() => {
    let text = "";
    if (!minutes && !seconds) {
      text = "만료됨";
      setOpenExpiredKeyPopup(true);
    }

    if (minutes === 3) {
      text = "";
    } else if (minutes || seconds) {
      text = `0${minutes}:${
        seconds === 0 ? `${seconds}0` : seconds < 10 ? `0${seconds}` : seconds
      }`;
    }
    setTimeText(text);
  }, [minutes, seconds]);

  isNextBtnDisabled.current =
    showResendBtn && getValues("secret")?.length === 6 && !isTryKeyErr
      ? false
      : true;

  return (
    <div id={styles.mobileAuth} className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.mAutoBox}>
          <h2 className={styles.title}>
            <span className={styles.blueText}>휴대폰 인증</span>을 해주세요
          </h2>
          <form>
            <section className={styles.section}>
              <div className={styles.inputLayout}>
                <input
                  type="number"
                  placeholder="01012341234"
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />
              </div>
              {showResendBtn ? (
                <OutlinedBtn
                  text={"재전송"}
                  type="gray"
                  onClick={handleSubmit(sendSecretCode)}
                />
              ) : (
                <ContainedBtn
                  text={"인증요청"}
                  disabled={phoneValidRef.current}
                  onClick={handleSubmit(sendSecretCode)}
                />
              )}
            </section>
            {showResendBtn && (
              <p className={styles.leftTimes}>
                <IconCheck />
                일일 문자 인증 가능 건수가 {leftCount}건 남았어요.
              </p>
            )}

            <div className={styles.inputLayout}>
              <input
                type="tel"
                placeholder="인증번호 6자리"
                {...register("secret", {
                  required: false,
                })}
              />
              {<p className={styles.timer}>{timeText}</p>}
            </div>
          </form>
          <ContainedBtn
            text={"다음"}
            disabled={isNextBtnDisabled.current}
            onClick={handleSubmit(verifyPhones)}
          />
        </div>
      </div>
      {openErrorPopup && (
        <>
          <ErrorMsgPopup
            confirmFunc={() => setOpenErrorPopup(false)}
            msg={
              <>
                <span>30초 이내에는</span>
                <span>인증번호를 다시 전송할 수 없어요.</span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenErrorPopup(false)} />
        </>
      )}
      {openExceedPopup && (
        <>
          <ErrorMsgPopup
            confirmFunc={() => setOpenExceedPopup(false)}
            msg={
              <>
                <span>인증문자는 하루에 최대 6회 받을 수 있어요.</span>
                <span>내일 다시 시도해주세요.</span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenExceedPopup(false)} />
        </>
      )}
      {openErrSecretPopup && (
        <>
          <ErrorMsgPopup
            confirmFunc={() => setOpenErrSecretPopup(false)}
            msg={
              <>
                <span>인증번호가 올바르지 않아요!</span>
                <span>인증번호를 확인해주세요.</span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenErrSecretPopup(false)} />
        </>
      )}
      {openExpiredKeyPopup && (
        <>
          <ErrorMsgPopup
            confirmFunc={() => {
              setOpenExpiredKeyPopup(false);
              push("/auth/signin");
            }}
            msg={
              <>
                <span>인증 정보가 만료되었습니다.</span>
                <span>로그인 화면으로 이동합니다.</span>
              </>
            }
          />
          <PopupBg bg off={() => {}} />
        </>
      )}
      {openTryKeyErrPopup && (
        <>
          <ErrorMsgPopup
            confirmFunc={() => setOpenTryKeyErrPopup(false)}
            msg={
              <>
                <span>인증번호 입력 시도 횟수가 초과되었습니다.</span>
                <span>인증번호를 재전송 후 다시 입력해주세요.</span>
              </>
            }
          />
          <PopupBg
            bg
            off={() => {
              setOpenTryKeyErrPopup(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default MobileAuth;

export function getStaticProps() {
  return { props: { navBar: true } };
}
