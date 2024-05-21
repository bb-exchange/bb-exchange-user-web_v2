import styles from "./loadingPopup.module.scss";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Iprops {
  message: any;
}

export default function LoadingPopup({ message }: Iprops) {
  return (
    <section className={styles.errorMsgPopup}>
      <div className={styles.msgBox}>
        <AiOutlineLoading3Quarters className={styles.loadingImg} color="#2965ff" />
        <p className={styles.msg}>{message}</p>
      </div>
    </section>
  );
}
