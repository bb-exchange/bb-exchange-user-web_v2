import styles from "./termIncome.module.scss";

import moment from "moment";

import ArrowIcon from "@assets/icons/ArrowAsset.svg";

import { ProfitSummary } from "@api/mypage";

import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";

export default function TermIncome() {
  const useMyTermIncome = UseMyTermIncome();

  // TODO: pagination, 조회 기간 필터
  const totalProfitByMonth = useMyTermIncome.profitLog?.data?.contents.reduce(
    (acc: ProfitSummary, cur: ProfitSummary) => acc.profitAmount + cur.profitAmount,
  );
  return (
    <article className={styles.termIncome}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>조회 기간</p>

          <div className={styles.dateLayout}>
            <span>
              <ArrowIcon onClick={useMyTermIncome.onPrevDate} />
            </span>
            <p>{useMyTermIncome.selectedDate}</p>
            <span>
              <ArrowIcon onClick={useMyTermIncome.onNextDate} />
            </span>
          </div>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>
      </div>

      {useMyTermIncome.profitLog?.data?.contents.length ? (
        <>
          <div className={styles.totalAsset}>
            <h2>{moment(useMyTermIncome.month).format("YYYY년 MM월")} 총 수익</h2>
            <p className={styles.strongText}>{Intl.NumberFormat().format(totalProfitByMonth)}원</p>
          </div>
          <ul className={styles.revenueList}>
            {useMyTermIncome.profitLog?.data?.contents.map(
              (content: ProfitSummary, index: number) => (
                <li key={`${content.profitAmount}_${content.profitDate}_${index}`}>
                  <div>{moment(content.profitDate).format("YYYY.MM.DD")}</div>
                  <strong className={styles.strongText}>
                    {Intl.NumberFormat().format(content.profitAmount)}원
                  </strong>
                </li>
              ),
            )}
          </ul>
        </>
      ) : (
        <p className={styles.noData}>검색결과가 없습니다.</p>
      )}
    </article>
  );
}
