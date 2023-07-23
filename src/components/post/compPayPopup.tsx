import usePost from ".src/hooks/post/usePost";
import styles from "./compPayPopup.module.scss";
import X from ".assets/icons/X.svg";

interface Iprops {
  off: () => void;
}

export default function CompPayPopup({ off }: Iprops) {
  return (
    <section className={styles.compPayPopup}>
      <article className={styles.topBar}>
        <button className={styles.exitBtn} onClick={() => {}}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <div className={styles.contCont}>
          <h1 className={styles.title}>
            결제가 <strong>완료</strong>
            되었어요!
          </h1>

          <p className={styles.cont}>구매한 글을 지금 확인해보세요!</p>
        </div>

        <button className={styles.confirmBtn} onClick={off}>
          지금 볼래요!
        </button>
      </article>
    </section>
  );
}
