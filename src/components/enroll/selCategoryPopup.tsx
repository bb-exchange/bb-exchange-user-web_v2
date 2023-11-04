import { useQuery } from "@tanstack/react-query";
import styles from "./selCategoryPopup.module.scss";

import { fetchCategory } from ".src/api/articles/category";

interface Iprops {
  off: Function;
  setValue: Function;
}

export default function SelCategoryPopup({ off, setValue }: Iprops) {
  const { data: categoryList } = useQuery({
    queryKey: ["articleCategory"],
    queryFn: fetchCategory,
  });

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
