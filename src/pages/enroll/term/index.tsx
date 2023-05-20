import { useRouter } from "next/router";
import styles from "./termScreen.module.scss";
import { D_termList } from ".src/data/enroll/D_term";

export default function TermScreen() {
  const router = useRouter();

  return (
    <>
      <header className={styles.temporaryHeader}></header>

      <section className={styles.innerSec}>
        <article className={styles.topBar}>
          <h1 className={styles.pageTitle}>윤리서약</h1>
        </article>

        <article className={styles.contArea}>
          <div className={styles.termCont}>
            <div className={styles.explainBox}>
              <p className={styles.key}>YGmin20님, 안녕하세요!</p>
              <p className={styles.value}>
                비법 작성 전, 꼭 알아두셔야 하는 사항들을 미리 알려드립니다.
                아래 사항을 꼭 숙지하여, 즐겁고 안전한 비법 거래를 시작해보세요.
                <br />
                아래 사항에 동의하신다면 하단 &apos;동의합니다&apos; 버튼을
                눌러주세요.
              </p>
            </div>

            <ul className={styles.termList}>
              {D_termList.map((v, i) => (
                <li key={i}>
                  <div className={styles.titleBox}>
                    <>{v.icon}</>

                    <h2 className={styles.title}>{v.title}</h2>
                  </div>

                  <ul className={styles.detailList}>
                    {v.detail.map((detV, detI) => (
                      <li key={detI}>{detV}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.agreeBtn}
            onClick={() => {
              window.open("/enroll", "_blank", "noopener,noreferrer");
              router.reload();
            }}
          >
            동의합니다
          </button>
        </article>
      </section>

      <footer className={styles.temporaryFooter}></footer>
    </>
  );
}

// export function getStaticProps() {
//   return { props: { navBar: true } };
// }
