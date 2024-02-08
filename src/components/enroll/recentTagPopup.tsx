import styles from "./recentTagPopup.module.scss";
import UseRecentTagPopup from ".src/hooks/enroll/useRecentTagPopup";

interface Iprops {
  tagHook: ReturnType<typeof UseRecentTagPopup>;
}

export default function RecentTagPopup({ tagHook }: Iprops) {
  return (
    <section className={styles.recentTagPopup}>
      <ul className={styles.dataList}>
        {tagHook?.tagList?.map((v: any, i: number) => (
          <li key={i} onClick={() => tagHook.handleClickCategory(v.name)}>
            <p className={styles.tag}>#{v.name}</p>
            <p className={styles.count}>{v.count}개</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
