import styles from "./headingCategoryPopup.module.scss";

import { Heading } from "@data/enroll/D_heading";

interface Iprops {
  off: Function;
  setValue: Function;
  categoryList: Heading[];
}

export default function SelCategoryPopup({ off, setValue, categoryList }: Iprops) {
  function handleClickCategory(heading: Heading) {
    setValue(heading);
    off();
  }

  return (
    <section className={styles.selCategoryPopup}>
      <ul className={styles.dataList}>
        {categoryList.map((heading) => (
          <li key={heading.key} onClick={() => handleClickCategory({ ...heading })}>
            {heading.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
