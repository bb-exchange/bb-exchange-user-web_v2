import styles from "./eventCategory.module.scss";

import UseMyTermIncome from ".src/hooks/mypage/asset/useMytermIncome";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

export default function EventCategory() {
  const useMypageAsset = UseMypageAsset();

  return (
    <section className={styles.eventCategoryContainer}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <div className={styles.titleWrapper}>
            <div className={styles.dateText}>2022.10.16</div>
            <div className={styles.mainText}>앱에서 출석하기</div>
          </div>
          <div className={styles.subText}>+100 원</div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.titleWrapper}>
            <div className={styles.dateText}>2022.10.16</div>
            <div className={styles.mainText}>앱에서 출석하기</div>
          </div>
          <div className={styles.subText}>+100 원</div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.titleWrapper}>
            <div className={styles.dateText}>2022.10.16</div>
            <div className={styles.mainText}>앱에서 출석하기</div>
          </div>
          <div className={styles.subText}>+100 원</div>
        </li>
      </ul>
    </section>
  );
}
