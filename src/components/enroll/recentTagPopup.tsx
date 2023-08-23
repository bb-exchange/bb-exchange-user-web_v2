import { D_recentTagList } from ".src/data/enroll/D_enroll";
import styles from "./recentTagPopup.module.scss";
import UseRecentTagPopup from ".src/hooks/enroll/useRecentTagPopup";

interface Iprops {
  tagHook: ReturnType<typeof UseRecentTagPopup>;
}

export default function RecentTagPopup({ tagHook }: Iprops) {
  return (
    <section className={styles.recentTagPopup}>
      <ul className={styles.dataList}>
        {D_recentTagList.map((v, i) => (
          <li key={i} onClick={() => tagHook.handleClickCategory(v.recentTag)}>
            <p className={styles.tag}>#{v.recentTag}</p>
            <p className={styles.count}>{v.usedCount}개</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
