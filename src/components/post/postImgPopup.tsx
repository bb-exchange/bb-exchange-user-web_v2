import UsePost from ".src/hooks/post/usePost";
import styles from "./postImgPopup.module.scss";
import X from ".assets/icons/X.svg";
import ChevronLt from ".assets/icons/ChevronLt.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";

interface Iprops {
  usePostHook: ReturnType<typeof UsePost>;
}

export default function PostImgPopup({ usePostHook }: Iprops) {
  return (
    <section className={styles.imgPopup}>
      <button
        className={styles.exitBtn}
        onClick={() => usePostHook.setImgPopup("")}
      >
        <X />
      </button>

      <article className={styles.imgArea}>
        <button
          className={`${styles.beforeBtn} ${styles.pageBtn}`}
          onClick={() => {}}
        >
          <ChevronLt />
        </button>

        <img className={styles.img} src={usePostHook.imgPopup} alt="" />

        <button
          className={`${styles.nextBtn} ${styles.pageBtn}`}
          onClick={() => {}}
        >
          <ChevronRt />
        </button>
      </article>

      <span className={styles.pageBox}>
        <p>
          <strong>1</strong> / 10
        </p>
      </span>
    </section>
  );
}
