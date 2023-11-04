import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styles from "./postCategoryPopup.module.scss";

import { categoryState } from ".src/recoil/category";
import { fetchCategory } from ".src/api/articles/category";

export default function CategoryPopup() {
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState);

  const { data: categoryList } = useQuery({
    queryKey: ["articleCategory"],
    queryFn: fetchCategory,
    select: (data) => [{ category: "ALL", description: "전체" }, ...data],
  });

  return (
    <section className={styles.hoverArea}>
      <article className={styles.postCategoryPopup}>
        <div className={styles.labelArea}>
          <h4 className={styles.label}>
            <strong>어떤 카테고리의 비법</strong>을<br />
            보고싶으신가요?
          </h4>
        </div>

        <ul className={styles.categoryList}>
          {categoryList?.map(({ category, description }) => (
            <li
              key={category}
              className={category === currentCategory ? styles.selected : ""}
              onClick={() => setCurrentCategory(category)}
            >
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
