import UsePostVerPopup from ".src/hooks/post/usePostVerPopup";
import styles from "./postVerPopup.module.scss";
import X from ".assets/icons/X.svg";
import Best from ".assets/icons/badge/Best.svg";
import moment from "moment";

interface Iprops {
  off: Function;
}

export default function PostVerPopup({ off }: Iprops) {
  const customHook = UsePostVerPopup();

  return (
    <section className={styles.postVerPopup}>
      <article className={styles.titleBar}>
        <h1 className={styles.title}>버전 선택하기</h1>

        <button className={styles.exitBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      <ul className={styles.verList}>
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
    </section>
  );
}
