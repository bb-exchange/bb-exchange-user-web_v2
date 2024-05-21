import styles from "./scrollTopBtn.module.scss";

import ScrollTop from ".assets/icons/ScrollTop.svg";
import UseScrollTopBtn from ".src/hooks/common/useScrollTopBtn";

export default function ScrollTopBtn() {
  const useScrollTopBtn = UseScrollTopBtn();

  function onClickScrollBtn() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`${styles.scrollTopBtn} ${useScrollTopBtn.scrollEnd ? styles.scrollEnd : ""}`}
      onClick={onClickScrollBtn}
    >
      <ScrollTop />
    </button>
  );
}
