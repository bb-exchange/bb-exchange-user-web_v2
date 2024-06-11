import styles from "./eventCategory.module.scss";

import moment from "moment";

import { ProfitEventSummary } from "@api/mypage";

import { ProfitCategoryEventTypeCode } from "@const/common";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";
import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";

export default function EventCategory() {
  const useMyTermIncome = UseMyTermIncome();
  console.log("ddd ", useMyTermIncome?.profitEventLog?.data?.contents);

  // TODO: pagination

  return (
    <section className={styles.eventCategoryContainer}>
      <ul className={styles.list}>
        {useMyTermIncome?.profitEventLog?.data?.contents &&
        useMyTermIncome?.profitEventLog?.data?.contents.length > 0 ? (
          useMyTermIncome?.profitEventLog?.data?.contents.map((content: ProfitEventSummary) => {
            return (
              <li className={styles.listItem}>
                <div className={styles.titleWrapper}>
                  <div className={styles.dateText}>
                    {moment(content.profitDate).format("YYYY.MM.DD")}
                  </div>
                  <div className={styles.mainText}>
                    {ProfitCategoryEventTypeCode[content.eventType]?.label}
                  </div>
                </div>
                <div className={styles.subText}>+{content.profitAmount} 원</div>
              </li>
            );
          })
        ) : (
          <li className={styles.listItem}>
            <div className={styles.noData}>데이터가 없습니다.</div>
          </li>
        )}
      </ul>
    </section>
  );
}
