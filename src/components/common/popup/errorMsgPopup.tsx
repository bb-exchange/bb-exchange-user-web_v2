import styles from "./errorMsgPopup.module.scss";

interface Iprops {
  msg: any;
  subMsg?: any;
  confirmFunc: Function;
}

export default function ErrorMsgPopup({ msg, subMsg, confirmFunc }: Iprops) {
  return (
    <section className={styles.errorMsgPopup}>
      <div className={styles.msgBox}>
        <p className={styles.msg}>{msg}</p>

        {subMsg ? <p className={styles.subMsg}>{subMsg}</p> : <></>}
      </div>

      <button className={styles.confirmBtn} onClick={() => confirmFunc()}>
        확인
      </button>
    </section>
  );
}
