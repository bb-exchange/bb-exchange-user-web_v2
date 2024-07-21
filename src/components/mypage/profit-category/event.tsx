import styles from "./event.module.scss";

import moment from "moment";

import ArrowIcon from "@assets/icons/ArrowAsset.svg";

import { ProfitEventSummary } from "@api/mypage";

import { ProfitCategoryEventTypeCode } from "@const/common";

import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";

export default function Event() {
  const useMyTermIncome = UseMyTermIncome();
  // TODO: pagination

  return (
    <section className={styles.eventCategoryContainer}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>조회 기간</p>

          <div className={styles.dateLayout}>
            <span>
              <ArrowIcon onClick={useMyTermIncome.onPrevDate} />
            </span>
            <p>{moment(useMyTermIncome.month).format("YYYY.MM")}</p>
            <span>
              <ArrowIcon onClick={useMyTermIncome.onNextDate} />
            </span>
          </div>
        </div>
      </div>

      <ul className={styles.list}>
        {useMyTermIncome?.profitEventLog?.data?.contents &&
        useMyTermIncome?.profitEventLog?.data?.contents.length > 0 ? (
          useMyTermIncome?.profitEventLog?.data?.contents.map(
            (content: ProfitEventSummary, index: number) => {
              return (
                <li
                  className={styles.listItem}
                  key={`${content.profitDate}_${content.eventType}_${content.profitAmount}_${index}`}
                >
                  <div className={styles.dateText}>
                    {moment(content.profitDate).format("YYYY.MM.DD")}
                  </div>
                  <div className={styles.mainText}>
                    {ProfitCategoryEventTypeCode[content.eventType]?.label}
                  </div>
                  <div className={styles.subText}>
                    +{Intl.NumberFormat().format(content.profitAmount)} 원
                  </div>
                </li>
              );
            },
          )
        ) : (
          <li>
            <div className={styles.noData}>데이터가 없습니다.</div>
          </li>
        )}
      </ul>
    </section>
  );
}
