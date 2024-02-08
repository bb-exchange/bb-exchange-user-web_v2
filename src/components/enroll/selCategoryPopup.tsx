import styles from "./selCategoryPopup.module.scss";

interface Iprops {
  off: Function;
  setValue: Function;
  categoryList: { category: string; description: string }[];
}

export default function SelCategoryPopup({
  off,
  setValue,
  categoryList,
}: Iprops) {
  function handleClickCategory(v: IpostCategories) {
    setValue(v);
    off();
  }

  return (
    <section className={styles.selCategoryPopup}>
      <ul className={styles.dataList}>
        {categoryList?.map(({ category, description }) => (
          <li
            key={category}
            onClick={() => handleClickCategory({ category, description })}
          >
            {description}
          </li>
        ))}
      </ul>
    </section>
  );
}
