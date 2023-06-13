import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <main className={styles.home}>
        <section className={styles.postSec}>
          <ul className={styles.postList}>
          {/* {.map((v, i) => (
          <li key={i}>{v}</li>
          ))} */}
          </ul>
        </section>
      </main>
    </>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
