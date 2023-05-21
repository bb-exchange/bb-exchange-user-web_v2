import styles from "./errorMsgPopup.module.scss";

interface Iprops {
  msg: any;
  confirmFunc: Function;
}

export default function ErrorMsgPopup({ msg, confirmFunc }: Iprops) {
  return (
    <section className={styles.errorMsgPopup}>
      <p className={styles.msg}>{msg}</p>

      <button className={styles.confirmBtn} onClick={() => confirmFunc()}>
        확인
      </button>
    </section>
  );
}
