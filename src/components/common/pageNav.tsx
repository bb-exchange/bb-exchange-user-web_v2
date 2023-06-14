import styles from "./pageNav.module.scss";
import ArwLt from ".assets/icons/ArwLt.svg";
import ArwRt from ".assets/icons/ArwRt.svg";
import usePageNav from ".src/hooks/common/usePageNav";

export default function PageNav() {
  const customHook = usePageNav();

  return (
    <nav className={styles.pageNavArea}>
      <button
        className={`${styles.preBtn} ${styles.arwBtn}`}
        onClick={() => customHook.onClickArrBtn("pre")}
      >
        <ArwLt />
      </button>

      <ul className={styles.pageNavList}>
        {[1, 2, 3, 4].map((v, i) => (
          <li
            key={i}
            className={`${v == customHook.page ? styles.on : ""}`}
            onClick={() => customHook.onClickPageBtn(v)}
          >
            <p>{v}</p>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.preBtn} ${styles.arwBtn}`}
        onClick={() => customHook.onClickArrBtn("next")}
      >
        <ArwRt />
      </button>
    </nav>
  );
}
