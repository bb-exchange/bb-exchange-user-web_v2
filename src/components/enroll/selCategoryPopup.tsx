import styles from "./selCategoryPopup.module.scss";
import usePostCategoryQuery from ".src/hooks/post/useCategoryQuery";

interface Iprops {
  off: Function;
  setValue: Function;
}

export default function SelCategoryPopup({ off, setValue }: Iprops) {
  const categoryQuery = usePostCategoryQuery();

  function handleClickCategory(v: Icategories) {
    setValue(v);
    off();
  }

  return (
    <section className={styles.selCategoryPopup}>
      <ul className={styles.dataList}>
        {((categoryQuery.data as Icategories[]) || []).map((v, i) => (
          <li key={i} onClick={() => handleClickCategory(v)}>
            {v.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
