import termsOfService from ".src/components/terms/service";
import styles from "./textPopup.module.scss";
import IconX from ".assets/icons/X.svg";
interface Iprops {
  type: string;
  confirmFunc: Function;
}

export default function TextPopup({ type, confirmFunc }: Iprops) {
  const returnData = () => {
    switch (type) {
      case "service":
        return termsOfService();
        break;

      default:
        break;
    }
  };

  return (
    <section className={styles.textPopup}>
      <div className={styles.title}>
        <h2>제목</h2>
        <IconX className={styles.iconX} onClick={() => confirmFunc()} />
      </div>
      <section className={styles.content}>{returnData()}</section>
    </section>
  );
}
