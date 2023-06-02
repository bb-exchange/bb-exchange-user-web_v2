import styles from "./index.module.scss";
import ImageFirework from "../../../../public/assets/images/firework.svg";
import LocalStorage from ".src/util/localStorage";
import { useEffect, useState } from "react";
import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import { useRouter } from "next/router";

const SignUpCompletion = () => {
  const [nickname, setNickname] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    if (LocalStorage.getItem("nickname"))
      setNickname(LocalStorage.getItem("nickname"));
  }, []);

  return (
    <div id={styles.signUpCompletion} className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.imgWrap}>
          <ImageFirework />
        </div>
        <h2 className={styles.title}>
          <span className={styles.blueText}>{nickname}</span>님,
          <br />
          서비스 가입을 축하드려요!
        </h2>
        <p>
          내 글이 비법처럼 상장되는 곳<br />
          비법거래소에 오신 것을 환영합니다.
        </p>
        <ContainedBtn text={"시작하기"} onClick={() => router.push("/")} />
      </div>
    </div>
  );
};

export default SignUpCompletion;

export function getStaticProps() {
  return { props: { navBar: true } };
}
