import styles from "./termIncome.module.scss";
import UseMyTermIncome from ".src/hooks/mypage/asset/useMytermIncome";
import ArrowIcon from ".assets/icons/ArrowAsset.svg";

export default function TermIncome() {
  const prop = UseMyTermIncome();

  return (
    <article className={styles.termIncome}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>조회 기간</p>

          <div className={styles.dateLayout}>
            <span>
              <ArrowIcon onClick={prop.onPrevDate} />
            </span>
            <p>{prop.selectedDate}</p>
            <span>
              <ArrowIcon onClick={prop.onNextDate} />
            </span>
          </div>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>
      </div>

      {prop.revenueList.length ? (
        <>
          <div className={styles.totalAsset}>
            <h2>2023년 10월 총 수익</h2>
            <p className={styles.strongText}>
              {Intl.NumberFormat().format(prop.totalPoint)}원
            </p>
          </div>
          <ul className={styles.revenueList}>
            {prop.revenueList.map((v, i) => (
              <li key={i}>
                <div>{v.date}</div>
                <strong className={styles.strongText}>
                  {Intl.NumberFormat().format(v.point)}원
                </strong>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.noDateText}>검색결과가 없습니다.</p>
      )}
    </article>
  );
}
