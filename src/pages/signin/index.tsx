import styles from "./styles/index.module.scss";
import Badge from "../../../public/assets/images/splash_badge.svg";
import Kakao from "../../../public/assets/images/kakao_login.svg";
import Google from "../../../public/assets/images/google_logo.svg";
import Apple from "../../../public/assets/images/apple_logo.svg";
import { signIn } from "next-auth/react";
const SignIn = () => {
  const kakaoSignIn = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin",
    });
  };
  return (
    <div id={styles.signIn}>
      <div className={styles.contentBox}>
        <h2>
          간편하게 로그인하고
          <br />
          다양한 비법들을 만나보세요!
        </h2>
        <p>적은 비용으로 어디에도 없던 숨은 비법을 즐기세요!</p>
        <Badge className={styles.badge} />
        <Kakao className={styles.kakao} onClick={kakaoSignIn} />
        <span className={styles.or}>또는</span>
        <section className={styles.logoWrap}>
          <Google className={styles.google} onClick={() => signIn("google")} />
          <Apple className={styles.apple} onClick={() => signIn("apple")} />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
