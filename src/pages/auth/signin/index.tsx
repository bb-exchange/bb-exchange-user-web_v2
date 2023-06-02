import styles from "./index.module.scss";
import Kakao from "../../../../public/assets/images/kakao_login.svg";
import Google from "../../../../public/assets/images/google_logo.svg";
import Apple from "../../../../public/assets/images/apple_logo.svg";
import Image from "next/image";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from ".src/data/signin/D_authUrl";

const SignIn = () => {
  const googleSignIn = () => {
    window.location.assign(GOOGLE_AUTH_URL);
  };
  const kakaoSignIn = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <div id={styles.signIn} className={styles.container}>
      <div className={styles.contentBox}>
        <h2>
          간편하게 로그인하고
          <br />
          다양한 비법들을 만나보세요!
        </h2>
        <p>적은 비용으로 어디에도 없던 숨은 비법을 즐기세요!</p>
        <div className={styles.imgWrap}>
          <Image
            src="/assets/images/splash_badge.svg"
            alt="스플래시 이미지"
            width={119}
            height={171}
            className={styles.badge}
          />
        </div>

        <Kakao className={styles.kakao} onClick={kakaoSignIn} />
        <span className={styles.or}>또는</span>
        <section className={styles.logoWrap}>
          <Google className={styles.google} onClick={googleSignIn} />
          <Apple className={styles.apple} />
        </section>
      </div>
    </div>
  );
};

export default SignIn;

export function getStaticProps() {
  return { props: { navBar: true } };
}
