import styles from "./confirmPopup.module.scss";

interface Iprops {
  title?: string;
  content?: any;
  cancelText?: string;
  cancelFunc: Function;
  confirmText?: string;
  confirmFunc: Function;
  zIndex?: number;
}

export default function ConfirmPopup({
  title,
  content,
  cancelText = "아니오",
  cancelFunc,
  confirmText = "네",
  confirmFunc,
  zIndex,
}: Iprops) {
  return (
    <section className={styles.confirmPopup} style={{ zIndex }}>
      <div className={styles.contentBox}>
        {title && <h1 className={styles.title}>{title}</h1>}

        {content && typeof content === "string" ? (
          <p className={styles.content}>{content}</p>
        ) : (
          content
        )}
      </div>

      <div className={styles.btnBar}>
        <button className={styles.cancelBtn} onClick={() => cancelFunc()}>
          {cancelText}
        </button>

        <button className={styles.confirmBtn} onClick={() => confirmFunc()}>
          {confirmText}
        </button>
      </div>
    </section>
  );
}
