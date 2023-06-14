import styles from "./scrollTopBtn.module.scss";
import ScrollTop from ".assets/icons/ScrollTop.svg";

export default function ScrollTopBtn() {
  function onClickScrollBtn() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button className={styles.scrollTopBtn} onClick={onClickScrollBtn}>
      <ScrollTop />
    </button>
  );
}
