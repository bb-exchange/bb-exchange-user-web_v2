import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { basicInstance } from ".src/api/instance";
import OutlinedBtn from ".src/components/Buttons/OutlinedBtn";
import IconCheck from "../../../../public/assets/icons/AuthCheck.svg";
import PopupBg from ".src/components/common/popupBg";
import ErrorMsgPopup from ".src/components/common/errorMsgPopup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import ExistingAccount from ".src/components/mobile-authentication/existingAccount";

interface Inputs {
  phoneNumber: string;
  secret: string;
}
const MobileAuth = () => {
  const cookies = useCookies(["authKey"])[0];
  const { push } = useRouter();
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [openExceedPopup, setOpenExceedPopup] = useState<boolean>(false); //일일인증횟수초과
  const [openErrSecretPopup, setOpenErrSecretPopup] = useState<boolean>(false); //인증번호에러
  const [hasExistingAccount, setHasExistingAccount] = useState<boolean>(false);
  const [existingAccountType, setExistingAccountType] = useState<string>("");
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
  //남은 인증 회수 더미데이터
  let leftTimes = 1;

  //휴대폰 인증번호 발송 api
  const sendSecretCode = async (data: Inputs) => {
    console.log(data, cookies?.authKey);
    try {
      const res = await basicInstance.post("/v1/auth/phones/send-secret", {
        key: cookies.authKey,
        phoneNumber: data.phoneNumber,
      });
      console.log(res);
      //인증번호 문자 전송 완료
      if (res.data.data.status === "SECRET_SENT") {
        if (leftTimes === 0) {
          //남은 인증 회수가 없으면 팝업창 띄우기
          setOpenExceedPopup(true);
        } else {
          setShowResendBtn(true);
          setMinutes(5);
          setSeconds(0);
          setValue("secret", ""); //인증번호 입력창 초기화
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //휴대폰 인증 api
  const verifyPhones = async (data: Inputs) => {
    try {
      const res = await basicInstance.post("/v1/auth/phones/verify", {
        key: cookies.authKey,
        secret: data.secret,
      });
      console.log(res.data.data.key);
      if (res.data.data.key && res.data.data.expireTime) {
        //인증 성공
        push("/auth/user-nickname");
      } else if (res.data.data.oauthTypes) {
        //휴대폰 번호 중복
        setHasExistingAccount(true);
        if (res.data.data.oauthTypes?.includes("KAKAO")) {
          setExistingAccountType("KAKAO");
        } else if (res.data.data.oauthTypes?.includes("GOOGLE")) {
          setExistingAccountType("GOOGLE");
        } else if (res.data.data.oauthTypes?.includes("APPLE")) {
          setExistingAccountType("APPLE");
        }
      }
    } catch (error: any) {
      if (error.response.data.message === "wrong secret") {
        setOpenErrSecretPopup(true);
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

  return (
    <div id={styles.mobileAuth}>
      {hasExistingAccount ? (
        <ExistingAccount type={existingAccountType} />
      ) : (
        <div className={styles.contentBox}>
          <h2 className={styles.title}>
            <span className={styles.blueText}>휴대폰 인증</span>을 해주세요
          </h2>
          <form>
            <section>
              <div className={styles.inputLayout}>
                <input
                  type="tel"
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
                  text={"인증받기"}
                  disabled={watch("phoneNumber")?.length >= 10 ? false : true}
                  onClick={handleSubmit(sendSecretCode)}
                />
              )}
            </section>
            {showResendBtn && (
              <p className={styles.leftTimes}>
                <IconCheck />
                {/* TODO: 인증 가능 건수 백엔드에서 받아오기 */}
                일일 문자 인증 가능 건수가 5건 남았어요.
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
              {showResendBtn && (
                <p className={styles.timer}>
                  0{minutes}:
                  {seconds === 0
                    ? `${seconds}0`
                    : seconds < 10
                    ? `0${seconds}`
                    : seconds}
                </p>
              )}
            </div>
          </form>

          <ContainedBtn
            text={"다음"}
            disabled={
              showResendBtn && getValues("secret")?.length === 6 ? false : true
            }
            onClick={handleSubmit(verifyPhones)}
          />
        </div>
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
    </div>
  );
};

export default MobileAuth;

export function getStaticProps() {
  return { props: { navBar: true } };
}
