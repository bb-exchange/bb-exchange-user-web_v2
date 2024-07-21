import styles from "./like.module.scss";

import { useRouter } from "next/router";

import Swap from "@assets/icons/Swap.svg";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import PageNav from "@components/common/pageNav";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import LikePost from "@components/mypage/like/likePost";
import ProfSec from "@components/mypage/profSec";
import Tab from "@components/mypage/tab";

import UseMyPageLike from "@hooks/mypage/useMypageLike";

export default function MypageWrite() {
  const router = useRouter();
  const useMypageLike = UseMyPageLike();

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) =>
    pageIndex === 0 ? router.push(router.pathname) : router.push({ query: { page: pageIndex } });

  return (
    <>
      <CommonHeader />

      <main className={styles.mypageRead}>
        <ProfSec />

        <section className={styles.postSec}>
          <article className={styles.toolBar}>
            <Tab />

            <div className={styles.rightCont}>
              {useMypageLike.editMode ? (
                <>
                  <button className={styles.selAllBtn} onClick={useMypageLike.onClickSelAllBtn}>
                    전체선택
                  </button>
                  <hr />
                  <button className={styles.delSelLikeBtn} onClick={useMypageLike.onClickDelBtn}>
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
                    onClick={useMypageLike.onSortList}
                  >
                    <Swap />

                    <p>최신순</p>
                  </button>

                  {/* NOTE 잠시 기능 막아둠 */}
                  {/* <button
                    className={styles.editModeBtn}
                    onClick={() => useMypageLike.setEditMode(true)}
                  >
                    편집
                  </button> */}
                </>
              )}
            </div>
          </article>

          <ul className={styles.postList}>
            {useMypageLike?.interestsList?.contents?.map((v: any, i: number) => (
              <LikePost data={v} index={i} useMypageLike={useMypageLike} key={i} />
            ))}
          </ul>

          <PageNav
            totalPages={useMypageLike.interestsList?.totalPages}
            currentPage={useMypageLike.interestsList?.pageNumber}
            onChangePage={onChangePage}
          />
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
