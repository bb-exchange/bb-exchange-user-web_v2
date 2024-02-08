import UsePostVerPopup from ".src/hooks/post/usePostVerPopup";
import styles from "./postVerPopup.module.scss";
import X from ".assets/icons/X.svg";
import Best from ".assets/icons/badge/Best.svg";
import moment from "moment";
import UseScrollBar from ".src/hooks/common/useScrollBar";

interface Iprops {
  off: Function;
}

export default function PostVerPopup({ off }: Iprops) {
  const customHook = UsePostVerPopup();
  const useScrollBar = UseScrollBar();

  return (
    <section className={styles.postVerPopup}>
      <article className={styles.titleBar}>
        <h1 className={styles.title}>버전 선택하기</h1>

        <button className={styles.exitBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <ul className={styles.verList} onScroll={useScrollBar.onScroll}>
          {customHook.verList.map((v, i) => (
            <li
              key={i}
              className={`${v.now ? styles.now : ""} ${
                v.read ? styles.read : ""
              }`}
            >
              <div className={styles.topBar}>
                <div className={styles.verBox}>
                  {v.badge === "best" && <Best />}

                  <p className={styles.ver}>{`Ver.${v.num
                    .toString()
                    .padStart(2, "0")}`}</p>
                </div>

                <p className={styles.createdAt}>
                  {moment(v.createdAt).format("YYYY.MM.DD")}
                </p>
              </div>

              <p className={styles.title}>{v.title}</p>
            </li>
          ))}
        </ul>

        <div
          ref={useScrollBar.scrollBarRef}
          className={styles.scrollBar}
          style={{ top: useScrollBar.scrollTop }}
        />
      </article>
    </section>
  );
}
