import { D_categoryList } from ".src/data/enroll/D_enroll";
import styles from "./selCategoryPopup.module.scss";
import useCategoryQuery from ".src/hooks/articles/useCategoryQuery";

interface Iprops {
  off: Function;
  setValue: Function;
}

export default function SelCategoryPopup({ off, setValue }: Iprops) {
  const categoryQuery = useCategoryQuery();

  categoryQuery

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
