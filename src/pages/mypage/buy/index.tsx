import styles from "./buy.module.scss";

import { useRouter } from "next/router";

import Swap from ".assets/icons/Swap.svg";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import ProfSec from ".src/components/mypage/profSec";
import ReadPost from ".src/components/mypage/read/readPost";
import UseMyPageRead from ".src/hooks/mypage/useMypageRead";

export default function MypageWrite() {
  const router = useRouter();
  const useMypageRead = UseMyPageRead();

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
            <div className={styles.leftCont}>
              <ul className={styles.categoryList}>
                {useMypageRead.categoryList.map((v, i) => (
                  <li
                    key={i}
                    className={v.label === useMypageRead.category.label ? styles.on : ""}
                    onClick={() => useMypageRead.onClickCategoryBtn(v.url)}
                  >
                    <p>{v.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightCont}>
              <button
                className={`${styles.sortBtn} ${styles.utilBtn}`}
                onClick={useMypageRead.onSortList}
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
                  className={v === useMypageRead.filterCategroy ? styles.on : ""}
                  onClick={() => useMypageRead.setFilterCategory(v)}
                >
                  <p>{v}</p>
                </li>
              ))}
            </ul>
          </article>

          <ul className={styles.postList}>
            {useMypageRead?.purchaseList?.contents?.map((v: any, i: number) => (
              <ReadPost data={v} index={i} useMypageRead={useMypageRead} key={i} />
            ))}
          </ul>

          <PageNav
            totalPages={useMypageRead.purchaseList?.totalPages}
            currentPage={useMypageRead.purchaseList?.pageNumber}
            onChangePage={onChangePage}
          />
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
