import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./like.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import ProfSec from ".src/components/mypage/profSec";
import Swap from ".assets/icons/Swap.svg";
import PageNav from ".src/components/common/pageNav";
import UseMyPageLike from ".src/hooks/mypage/useMypageLike";
import LikePost from ".src/components/mypage/like/likePost";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";

export default function MypageWrite() {
  const useMypageLike = UseMyPageLike();

  return (
    <>
      <CommonHeader />

      <main className={styles.mypageRead}>
        <ProfSec />

        <section className={styles.postSec}>
          <article className={styles.toolBar}>
            <div className={styles.leftCont}>
              <ul className={styles.categoryList}>
                {useMypageLike.categoryList.map((v, i) => (
                  <li
                    key={i}
                    className={
                      v.label === useMypageLike.category.label ? styles.on : ""
                    }
                    onClick={() => useMypageLike.onClickCategoryBtn(v.url)}
                  >
                    <p>
                      {v.label} {v.count || 0}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightCont}>
              {useMypageLike.editMode ? (
                <>
                  <button
                    className={styles.selAllBtn}
                    onClick={useMypageLike.onClickSelAllBtn}
                  >
                    전체선택
                  </button>
                  <hr />
                  <button
                    className={styles.delSelLikeBtn}
                    onClick={useMypageLike.onClickDelBtn}
                  >
                    선택삭제&nbsp;
                    <span className={styles.blue}>
                      {useMypageLike.postList.filter((e) => e.sel).length}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`${styles.sortBtn} ${styles.utilBtn}`}
                    onClick={() => {}}
                  >
                    <Swap />

                    <p>최신순</p>
                  </button>

                  <button
                    className={styles.editModeBtn}
                    onClick={() => useMypageLike.setEditMode(true)}
                  >
                    편집
                  </button>
                </>
              )}
            </div>
          </article>

          <ul className={styles.postList}>
            {useMypageLike.postList.map((v, i) => (
              <LikePost
                data={v}
                index={i}
                useMypageLike={useMypageLike}
                key={i}
              />
            ))}
          </ul>

          <PageNav />
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
