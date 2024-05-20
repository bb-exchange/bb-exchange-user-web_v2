import styles from "./mypage.module.scss";

import BtnSqrChk from ".assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from ".assets/icons/BtnSqrChkOn.svg";
import Swap from ".assets/icons/Swap.svg";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import ProfSec from ".src/components/mypage/profSec";
import WritePost from ".src/components/mypage/write/writePost";
import UseMyPageWrite from ".src/hooks/mypage/useMypageWrite";

export default function MypageWrite() {
  const useMypageWrite = UseMyPageWrite();

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
                    <p>
                      {v.label} {v.count || 0}
                    </p>
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
            {useMypageWrite.postList?.contents?.map((v: any, i: number) => (
              <WritePost data={v} key={i} />
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
