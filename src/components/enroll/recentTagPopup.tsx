import { D_recentTagList } from ".src/data/enroll/D_enroll";
import styles from "./recentTagPopup.module.scss";
import useEnroll from ".src/hooks/enroll/useEnroll";

interface Iprops {
  useEnrollHook: ReturnType<typeof useEnroll>;
}

export default function RecentTagPopup({ useEnrollHook }: Iprops) {
  function handleClickCategory(v: string) {
    useEnrollHook.setNewTag(v);
  }

  return (
    <section className={styles.recentTagPopup}>
      <ul className={styles.dataList}>
        {D_recentTagList.map((v, i) => (
          <li key={i} onClick={() => handleClickCategory(v.recentTag)}>
            <p className={styles.tag}>#{v.recentTag}</p>
            <p className={styles.count}>{v.usedCount}개</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
