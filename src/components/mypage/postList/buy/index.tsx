import styles from "../postList.module.scss";

import Swap from "@assets/icons/Swap.svg";

import PageNav from "@components/common/pageNav";
import ReadPost from "@components/mypage/read/readPost";

import UseMyPageRead from "@hooks/mypage/useMypageRead";

export default function Buy() {
  const useMypageRead = UseMyPageRead();

  return (
    <article className={styles.writtenContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.countText}>
          <strong>전체 {useMypageRead.purchaseList?.totalElements}</strong> | 미열람 0
        </span>
        <button className={styles.filterButton} onClick={useMypageRead.onSortList}>
          <Swap />
          <p>최신순</p>
        </button>
      </div>

      <ul>
        {useMypageRead?.purchaseList?.contents?.map((v: any, i: number) => (
          <ReadPost data={v} index={i} useMypageRead={useMypageRead} key={i} />
        ))}
      </ul>

      <div className={styles.pageNav}>
        <PageNav
          totalPages={useMypageRead.purchaseList?.totalPages}
          currentPage={useMypageRead.purchaseList?.pageNumber}
          onChangePage={useMypageRead.onChangePage}
        />
      </div>
    </article>
  );
}
