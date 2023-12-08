import { useMemo } from "react";
import classNames from "classnames";

import ArwLt from ".assets/icons/ArwLt.svg";
import ArwRt from ".assets/icons/ArwRt.svg";
import styles from "./pageNav.module.scss";

interface Iprops {
  totalPages?: number;
  currentPage?: number;
  onChangePage?: (pageIndex: number) => void;
}

export default function PageNav({
  totalPages = 1,
  currentPage = 0,
  onChangePage,
}: Iprops) {
  // NOTE - 화면 출력 페이지 목록 최대 개수
  const listCount = 10;

  const { hasPrev, hasNext, pageList, currentPageGroup } = useMemo(() => {
    const totalPageGroup = Math.floor(totalPages / listCount);
    const currentPageGroup = Math.floor(currentPage / listCount);

    const hasPrev = !!(currentPageGroup !== 0);
    const hasNext = !!(currentPageGroup !== totalPageGroup);

    const length = !!(hasPrev && hasNext) ? listCount : totalPages % listCount;
    // NOTE 현재 페이지 기준으로만 페이지 목록 생성
    const pageList = Array.from({ length }).map((_, idx) => {
      const page = currentPageGroup * listCount + idx;
      return {
        page,
        label: page + 1,
      };
    });

    return { hasPrev, hasNext, pageList, currentPageGroup };
  }, [currentPage, totalPages]);

  const onClickGroupButton = (type: "prev" | "next") => {
    if (onChangePage == null) return;

    const num = type === "prev" ? -1 : +1;
    const pageIndex = (currentPageGroup + num) * listCount;

    onChangePage(pageIndex);
  };

  const onClickPageButton = (pageIndex: number) =>
    onChangePage && onChangePage(pageIndex);

  return (
    <nav className={styles.pageNavArea}>
      <button
        className={classNames(styles.preBtn, styles.arwBtn)}
        aria-disabled={!hasPrev}
        onClick={() => hasPrev && onClickGroupButton("prev")}
      >
        <ArwLt />
      </button>

      <ul className={styles.pageNavList}>
        {pageList.map(({ page, label }) => (
          <li
            key={page}
            className={classNames(page == currentPage && styles.on)}
            onClick={() => onClickPageButton(page)}
          >
            <p>{label}</p>
          </li>
        ))}
      </ul>

      <button
        className={classNames(styles.preBtn, styles.arwBtn)}
        aria-disabled={!hasNext}
        onClick={() => hasNext && onClickGroupButton("next")}
      >
        <ArwRt />
      </button>
    </nav>
  );
}
