import styles from "./errorMsgPopup.module.scss";

interface Iprops {
  msg: string;
  off: Function;
}

export default function ErrorMsgPopup({ msg, off }: Iprops) {
  return (
    <section className={styles.errorMsgPopup}>
      <p className={styles.msg}>{msg}</p>

      <button className={styles.confirmBtn} onClick={() => off()}>
        확인
      </button>
    </section>
  );
}
