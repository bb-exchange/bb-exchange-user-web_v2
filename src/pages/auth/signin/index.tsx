import styles from "./styles/index.module.scss";
import Badge from "../../../../public/assets/images/splash_badge.svg";
import Kakao from "../../../../public/assets/images/kakao_login.svg";
import Google from "../../../../public/assets/images/google_logo.svg";
import Apple from "../../../../public/assets/images/apple_logo.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

const SignIn = () => {
  const kakaoSignIn = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/auth",
      scope: "openid",
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
        {/* 뱃지 이미지만 safari에서 이미지 로드가 안 됨 */}
        <Badge className={styles.badge} />
        {/* <Image
          src="/assets/images/splash_badge.svg"
          alt="dd"
          width={119}
          height={171}
          className={styles.badge}
        /> */}
        <Kakao className={styles.kakao} onClick={kakaoSignIn} />
        <span className={styles.or}>또는</span>
        <section className={styles.logoWrap}>
          <Google className={styles.google} />
          <Apple className={styles.apple} />
        </section>
        {/* <button onClick={() => signOut()}>로그아웃</button> */}
      </div>
    </div>
  );
};

export default SignIn;

export function getStaticProps() {
  return { props: { navBar: true } };
}
