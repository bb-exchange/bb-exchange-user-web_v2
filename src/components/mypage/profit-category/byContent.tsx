import styles from "./byContent.module.scss";

import moment from "moment";

import Swap from "@assets/icons/Swap.svg";

import { ProfitContentsSummary } from "@api/mypage";

import PageNav from "@components/common/pageNav";

import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";

export default function ByContent() {
  const useMyTermIncome = UseMyTermIncome();

  console.log(useMyTermIncome.profitContentLog);
  return (
    <article className={styles.termIncome}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>콘텐츠 제목 조회</p>

          <input
          // value={useMyTermIncome.contentTitle}
          // onChange={(e) => useMyTermIncome.setContentTitle(e.target.value)}
          />

          <button className={styles.submitBtn} onClick={() => {}}>
            조회
          </button>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>

        <button className={styles.sortBtn} onClick={() => {}}>
          <Swap />

          <p>수익순</p>
        </button>
      </div>

      <div className={styles.countBar}>
        <p className={styles.count}>
          총 {useMyTermIncome.profitContentLog?.data?.contents?.length}개
        </p>
      </div>

      <ul className={styles.dataList}>
        {useMyTermIncome.profitContentLog?.data?.contents &&
        useMyTermIncome.profitContentLog?.data?.contents?.length > 0 ? (
          useMyTermIncome.profitContentLog?.data?.contents?.map(
            (content: ProfitContentsSummary, index: number) => (
              <li
                key={`${content.contentCreatedDate}_${content.category}_${content.contentTitle}_${index}`}
              >
                <div className={styles.leftBox}>
                  <p className={styles.title}>{content.contentTitle}</p>

                  <div className={styles.infoBar}>
                    <p className={styles.category}>{content.category}</p>・
                    <p className={styles.createdAt}>{content.contentCreatedDate}</p>
                  </div>
                </div>

                <p className={styles.amount}>
                  {Intl.NumberFormat().format(content.profitAmount)} 원
                </p>
              </li>
            ),
          )
        ) : (
          <li className={styles.listItem}>
            <div className={styles.noData}>검색결과가 없습니다.</div>
          </li>
        )}
      </ul>

      <PageNav />
    </article>
  );
}
