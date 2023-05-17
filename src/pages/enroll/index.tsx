import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enroll.module.scss";

export default function Enroll() {
  return (
    <>
      <EnrollHeader />

      <main className={styles.enroll}>
        <section className={styles.enrollSec}>
          <article className={styles.topBar}>
            <h1 className={styles.pageTitle}>작성하기</h1>
          </article>
        </section>
      </main>
    </>
  );
}
