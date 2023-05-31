import styles from "./existingAccount.module.scss";
import LogoKakao from "../../../public/assets/images/kakao_logo.svg";
import LogoGoogle from "../../../public/assets/images/google_logo.svg";
import LogoApple from "../../../public/assets/images/apple_logo_v2.svg";
import OutlinedBtn from "../Buttons/OutlinedBtn";
import { useRouter } from "next/router";

const ExistingAccount = ({ type }: { type: string }) => {
  const router = useRouter();
  return (
    <div id={styles.existingAccount}>
      <div className={styles.contentBox}>
        <h2 className={styles.title}>이미 가입한 계정이 있어요</h2>
        <p>
          정보가 일치하는 계정이 존재합니다.
          <br /> 아래 계정으로 로그인해주세요.
        </p>
        <section className={styles.signInBox}>
          <div className={styles.logoWrap}>
            {type === "KAKAO" ? (
              <>
                <LogoKakao />
                <span>카카오</span>
              </>
            ) : type === "GOOGLE" ? (
              <>
                <LogoGoogle />
                <span>구글</span>
              </>
            ) : type === "APPLE" ? (
              <>
                <LogoApple />
                <span>애플</span>
              </>
            ) : null}
          </div>
          <OutlinedBtn text={"로그인"} type="gray" />
        </section>
      </div>
    </div>
  );
};

export default ExistingAccount;
