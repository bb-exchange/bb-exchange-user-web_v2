import { D_categoryList } from ".src/data/enroll/D_enroll";
import styles from "./selCategoryPopup.module.scss";

interface Iprops {
  off: Function;
  value: string;
  setValue: Function;
}

export default function SelCategoryPopup({ off, value, setValue }: Iprops) {
  function handleClickCategory(v: string) {
    setValue(v);
    off();
  }

  return (
    <section className={styles.selCategoryPopup}>
      <ul className={styles.dataList}>
        {D_categoryList.map((v, i) => (
          <li key={i} onClick={() => handleClickCategory(v)}>
            {v}
          </li>
        ))}
      </ul>
    </section>
  );
}
