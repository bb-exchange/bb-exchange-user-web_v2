import styles from "./textPopup.module.scss";

import IconX from ".assets/icons/X.svg";
import { POLICY_OF_PERSONAL_INFO } from ".src/data/terms-agreement/D_terms";

interface Iprops {
  type: string;
  confirmFunc: Function;
}

export default function TextPopup({ type, confirmFunc }: Iprops) {
  return (
    <section className={styles.textPopup}>
      <div className={styles.title}>
        <h2>서비스이용동의</h2>
        <IconX className={styles.iconX} onClick={() => confirmFunc()} />
      </div>
      <section className={styles.content}>{POLICY_OF_PERSONAL_INFO}</section>
    </section>
  );
}
