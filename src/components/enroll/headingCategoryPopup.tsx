import styles from "./headingCategoryPopup.module.scss";

interface Iprops {
  off: Function;
  setValue: Function;
  categoryList: string[];
}

export default function SelCategoryPopup({
  off,
  setValue,
  categoryList,
}: Iprops) {
  function handleClickCategory(v: string) {
    setValue(v);
    off();
  }

  return (
    <section className={styles.selCategoryPopup}>
      <ul className={styles.dataList}>
        {categoryList?.map((category) => (
          <li key={category} onClick={() => handleClickCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
