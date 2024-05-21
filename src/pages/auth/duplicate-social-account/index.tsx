import LogoApple from "../../../../public/assets/images/apple_logo_v2.svg";
import LogoGoogle from "../../../../public/assets/images/google_logo.svg";
import LogoKakao from "../../../../public/assets/images/kakao_logo.svg";

import styles from "./index.module.scss";

import { useCookies } from "react-cookie";

import OutlinedBtn from ".src/components/Buttons/OutlinedBtn";
import { APPLE_AUTH_URL, GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from ".src/data/signin/D_authUrl";

const DuplicateSocialAccount = () => {
  const [cookie, setCookie] = useCookies(["oauthId", "oauthType"]);

  return (
    <div id={styles.duplicateSocialAccount} className={styles.container}>
      <div className={styles.contentBox}>
        <h2 className={styles.title}>이미 가입한 계정이 있어요</h2>
        <p>
          정보가 일치하는 계정이 존재합니다.
          <br /> 아래 계정으로 로그인해주세요.
        </p>

        {cookie.oauthType === "KAKAO" ? (
          <section className={styles.signInBox}>
            <div className={styles.logoWrap}>
              <LogoKakao />
              <span>카카오</span>
            </div>
            <OutlinedBtn
              text={"로그인"}
              type="gray"
              onClick={() => window.location.assign(KAKAO_AUTH_URL)}
            />
          </section>
        ) : cookie.oauthType === "GOOGLE" ? (
          <section className={styles.signInBox}>
            <div className={styles.logoWrap}>
              <LogoGoogle />
              <span>구글</span>
            </div>
            <OutlinedBtn
              text={"로그인"}
              type="gray"
              onClick={() => window.location.assign(GOOGLE_AUTH_URL)}
            />
          </section>
        ) : cookie.oauthType === "APPLE" ? (
          <section className={styles.signInBox}>
            <div className={styles.logoWrap}>
              <LogoApple />
              <span>애플</span>
            </div>
            <OutlinedBtn
              text={"로그인"}
              type="gray"
              onClick={() => window.location.assign(APPLE_AUTH_URL)}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default DuplicateSocialAccount;

export function getStaticProps() {
  return { props: { navBar: true } };
}
