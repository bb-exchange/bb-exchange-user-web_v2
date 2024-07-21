import styles from "../postList.module.scss";

import Swap from "@assets/icons/Swap.svg";

import PageNav from "@components/common/pageNav";
import WritePost from "@components/mypage/write/writePost";

import UseMyPageWrite from "@hooks/mypage/useMypageWrite";

export default function Written() {
  const useMypageWrite = UseMyPageWrite();

  return (
    <article className={styles.writtenContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.countText}>
          <strong>전체 {useMypageWrite.postList?.totalElements}</strong> | 상장 글 0
        </span>
        <button className={styles.filterButton} onClick={useMypageWrite.onSortList}>
          <Swap />
          <p>최신순</p>
        </button>
      </div>

      <ul>
        {useMypageWrite.postList?.contents.map((v: mypageWritePosts, i: number) => (
          <WritePost data={v} key={i} />
        ))}
      </ul>

      <div className={styles.pageNav}>
        <PageNav
          totalPages={useMypageWrite.postList?.totalPages}
          currentPage={useMypageWrite.postList?.pageNumber}
          onChangePage={useMypageWrite.onChangePage}
        />
      </div>
    </article>
  );
}
