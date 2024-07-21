import styles from "./free.module.scss";

import { useRouter } from "next/router";

import Swap from "@assets/icons/Swap.svg";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import PageNav from "@components/common/pageNav";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import ProfSec from "@components/mypage/profSec";
import ReadPost from "@components/mypage/read/readPost";
import Tab from "@components/mypage/tab";

import UseMyPageRead from "@hooks/mypage/useMypageRead";

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
            <Tab />

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
