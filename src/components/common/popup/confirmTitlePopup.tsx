import styles from "./confirmTitlePopup.module.scss";

interface Iprops {
  title?: string;
  content?: any;
  confirmText?: string;
  confirmFunc: Function;
  zIndex?: number;
}

export default function ConfirmPopup({
  title,
  content,
  confirmText = "네",
  confirmFunc,
  zIndex,
}: Iprops) {
  return (
    <section className={styles.confirmPopup} style={{ zIndex }}>
      <div className={styles.contentBox}>
        {title && <h1 className={styles.title}>{title}</h1>}

        {content && <div className={styles.content}>{content}</div>}
      </div>

      <div className={styles.btnBar}>
        <button className={styles.confirmBtn} onClick={() => confirmFunc()}>
          {confirmText}
        </button>
      </div>
    </section>
  );
}
