import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./read.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import ProfSec from ".src/components/mypage/profSec";
import Swap from ".assets/icons/Swap.svg";
import PageNav from ".src/components/common/pageNav";
import UseMyPageRead from ".src/hooks/mypage/useMypageRead";
import ReadPost from ".src/components/mypage/read/readPost";

export default function MypageWrite() {
  const useMypageRead = UseMyPageRead();

  return (
    <>
      <CommonHeader />

      <main className={styles.mypageRead}>
        <ProfSec />

        <section className={styles.postSec}>
          <article className={styles.toolBar}>
            <div className={styles.leftCont}>
              <ul className={styles.categoryList}>
                {useMypageRead.categoryList.map((v, i) => (
                  <li
                    key={i}
                    className={
                      v.label === useMypageRead.category.label ? styles.on : ""
                    }
                    onClick={() => useMypageRead.onClickCategoryBtn(v.url)}
                  >
                    <p>
                      {v.label} {v.count || 0}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightCont}>
              <button
                className={`${styles.sortBtn} ${styles.utilBtn}`}
                onClick={() => {}}
              >
                <Swap />

                <p>최신순</p>
              </button>
            </div>
          </article>

          <article className={styles.filterArea}>
            <ul className={styles.categoryList}>
              {useMypageRead.filterCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={
                    v === useMypageRead.filterCategroy ? styles.on : ""
                  }
                  onClick={() => useMypageRead.setFilterCategory(v)}
                >
                  <p>{v}</p>
                </li>
              ))}
            </ul>
          </article>

          <ul className={styles.postList}>
            {useMypageRead.postList.map((v, i) => (
              <ReadPost data={v} index={i} useMypageRead={useMypageRead} key={i} />
            ))}
          </ul>

          <PageNav />
        </section>
      </main>

      <CommonFooter />
    </>
  );
}
