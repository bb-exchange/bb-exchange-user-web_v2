import usePostCategoryQuery from ".src/hooks/post/useCategoryQuery";
import styles from "./postCategoryPopup.module.scss";

export default function CategoryPopup() {
  const categoryQuery = usePostCategoryQuery();

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
          {((categoryQuery.data as Icategories[]) || []).map((v, i) => (
            <li key={i}>
              <p>{v.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
