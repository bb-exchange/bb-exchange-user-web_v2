import Align from ".assets/images/tiptap/center.svg";

import styles from "./alignCategoryPopup.module.scss";

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
            {category === "left" ? (
              <Align />
            ) : category === "center" ? (
              <Align />
            ) : (
              <Align />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
