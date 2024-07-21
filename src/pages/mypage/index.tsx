import styles from "./mypage.module.scss";

import { useRouter } from "next/router";

import BtnSqrChk from "@assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from "@assets/icons/BtnSqrChkOn.svg";
import Swap from "@assets/icons/Swap.svg";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import PageNav from "@components/common/pageNav";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import ProfSec from "@components/mypage/profSec";
import WritePost from "@components/mypage/write/writePost";

import UseMyPageWrite from "@hooks/mypage/useMypageWrite";

export default function Mypage() {
  const router = useRouter();
  const useMypageWrite = UseMyPageWrite();

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) =>
    pageIndex === 0
      ? router.push(router.pathname)
      : router.push({
          query: { page: pageIndex },
        });

  return (
    <>
      <CommonHeader />

      <main className={styles.mypageWrite}>
        <ProfSec />

        <section className={styles.postSec}>
          <article className={styles.toolBar}>
            <div className={styles.leftCont}>
              <ul className={styles.categoryList}>
                {useMypageWrite.categoryList.map((v, i) => (
                  <li
                    key={i}
                    className={v.label === useMypageWrite.category.label ? styles.on : ""}
                    onClick={() => useMypageWrite.onClickCategoryBtn(v.url)}
                  >
                    <p>{v.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightCont}>
              <button
                className={`${styles.filterOnSaleBtn} ${styles.utilBtn}`}
                onClick={useMypageWrite.onClickFilterOnSaleBtn}
              >
                {useMypageWrite.filterOnSale === "Y" ? <BtnSqrChkOn /> : <BtnSqrChk />}

                <p>상장된 글만 보기</p>
              </button>
              <button
                className={`${styles.sortBtn} ${styles.utilBtn}`}
                onClick={useMypageWrite.onSortList}
              >
                <Swap />
                <p>최신순</p>
              </button>
            </div>
          </article>

          <ul className={styles.postList}>
            {useMypageWrite.postList?.contents.map((v: mypageWritePosts, i: number) => (
              <WritePost data={v} key={i} />
            ))}
          </ul>

          <PageNav
            totalPages={useMypageWrite.postList?.totalPages}
            currentPage={useMypageWrite.postList?.pageNumber}
            onChangePage={onChangePage}
          />
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
