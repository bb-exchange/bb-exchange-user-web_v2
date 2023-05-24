import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { basicInstance } from ".src/api/instance";
import OutlinedBtn from ".src/components/Buttons/OutlinedBtn";
import IconCheck from "../../../../public/assets/icons/AuthCheck.svg";
import ConfirmPopup from ".src/components/common/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import ErrorMsgPopup from ".src/components/common/errorMsgPopup";
interface Inputs {
  phoneNumber: string;
  secret: string;
}
const MobileAuth = () => {
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [openExceedPopup, setOpenExceedPopup] = useState<boolean>(false);
  const [openErrSecretPopup, setOpenErrSecretPopup] = useState<boolean>(false);
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
  //휴대폰 인증번호 받기
  const getAuthCode = () => {
    if (leftTimes === 0) {
      //남은 인증 회수가 없으면 팝업창 띄우기
      setOpenExceedPopup(true);
    } else {
      setShowResendBtn(true);
      setMinutes(5);
      setSeconds(0);
      setValue("secret", ""); //인증번호 입력창 초기화
    }

    // const res = basicInstance.post("/")
  };

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
      <div className={styles.contentBox}>
        <h2 className={styles.title}>
          <span className={styles.blueText}>휴대폰 인증</span>을 해주세요
        </h2>
        <form>
          <section>
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
                onClick={handleSubmit(getAuthCode)}
              />
            ) : (
              <ContainedBtn
                text={"인증받기"}
                disabled={watch("phoneNumber")?.length >= 10 ? false : true}
                onClick={handleSubmit(getAuthCode)}
              />
            )}
          </section>
          {showResendBtn && (
            <p className={styles.leftTimes}>
              <IconCheck />
              일일 문자 인증 가능 건수가 5건 남았어요.
            </p>
          )}

          <div className={styles.inputLayout}>
            <input
              type="number"
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
          onClick={
            getValues("secret") === "000000"
              ? () => setOpenErrSecretPopup(true)
              : () => undefined
          }
        />
      </div>
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
