import styles from "./textPopup.module.scss";
import IconX from "../../../public/assets/icons/X.svg";
interface Iprops {
  content: {
    title: string;
    text: string;
  };
  confirmFunc: Function;
}

export default function TextPopup({ content, confirmFunc }: Iprops) {
  return (
    <section className={styles.textPopup}>
      <div className={styles.title}>
        <h2>{content.title}</h2>
        <IconX className={styles.iconX} onClick={() => confirmFunc()} />
      </div>
      <p className={styles.msg}>{content.text}</p>
    </section>
  );
}
