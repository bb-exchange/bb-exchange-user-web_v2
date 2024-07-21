import styles from "../postList.module.scss";

import Swap from "@assets/icons/Swap.svg";

import PageNav from "@components/common/pageNav";
import LikePost from "@components/mypage/like/likePost";

import UseMyPageLike from "@hooks/mypage/useMypageLike";

export default function MypageWrite() {
  const useMypageLike = UseMyPageLike();

  return (
    <article className={styles.writtenContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.countText}>
          <strong>전체 {useMypageLike.interestsList?.totalElements}</strong>
        </span>
        <button className={styles.filterButton} onClick={useMypageLike.onSortList}>
          <Swap />
          <p>최신순</p>
        </button>
      </div>

      <ul>
        {useMypageLike?.interestsList?.contents?.map((v: any, i: number) => (
          <LikePost data={v} index={i} useMypageLike={useMypageLike} key={i} />
        ))}
      </ul>

      <div className={styles.pageNav}>
        <PageNav
          totalPages={useMypageLike.interestsList?.totalPages}
          currentPage={useMypageLike.interestsList?.pageNumber}
          onChangePage={useMypageLike.onChangePage}
        />
      </div>
    </article>
  );
}
