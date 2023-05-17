import { useRouter } from "next/router";
import styles from "./enrollHeader.module.scss";
import LogoBlue from ".src/asset/images/logo/LogoBlue.svg";

export default function EnrollHeader() {
  const router = useRouter();

  return (
    <header className={styles.enrollHeader}>
      <section className={styles.saveBar}>
        <article className={styles.leftArea}>
          <button className={styles.logoBtn} onClick={() => router.push("/")}>
            <LogoBlue />
          </button>
        </article>

        <article className={styles.rightArea}>
          <div className={styles.tempSaveBox}>
            <button className={styles.tempSaveBtn2} onClick={() => {}}>
              임시 2
            </button>
            <button className={styles.tempSaveBtn1} onClick={() => {}}>
              임시저장
            </button>
          </div>

          <button disabled className={styles.enrollBtn} onClick={() => {}}>
            게시하기
          </button>
        </article>
      </section>
    </header>
  );
}
