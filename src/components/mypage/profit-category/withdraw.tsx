import styles from "./withdraw.module.scss";

import moment from "moment";

import ArrowIcon from "@assets/icons/ArrowAsset.svg";

import { SettlementWithdrawSummary } from "@api/mypage";

import PageNav from "@components/common/pageNav";

import { SettlementWithdrawStatusCode } from "@const/common";

import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";

export default function Withdraw() {
  const useMyTermIncome = UseMyTermIncome();

  return (
    <article className={styles.myWithdraw}>
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

      <ul className={styles.dataList}>
        {useMyTermIncome.settlementWithdrawLog?.data?.contents &&
        useMyTermIncome.settlementWithdrawLog?.data?.contents?.length > 0 ? (
          useMyTermIncome.settlementWithdrawLog?.data?.contents.map(
            (content: SettlementWithdrawSummary, index: number) => {
              return (
                <li key={`${content.withdrawAmount}_${content.withdrawRequestDate}_${index}`}>
                  <div className={styles.leftBox}>
                    <p className={styles.createdAt}>
                      {moment(content.withdrawRequestDate).format("YYYY.MM.DD")}
                    </p>
                  </div>

                  <div className={styles.rightBox}>
                    <p
                      className={`${styles.status} ${content.status === SettlementWithdrawStatusCode.PENDING.value ? styles.on : ""}`}
                    >
                      {SettlementWithdrawStatusCode[content.status]?.label ?? "WARNING"}
                    </p>

                    <p className={styles.amount}>
                      {Intl.NumberFormat().format(content.withdrawAmount)} 원
                    </p>
                  </div>
                </li>
              );
            },
          )
        ) : (
          <div className={styles.noData}>검색결과가 없습니다.</div>
        )}
      </ul>

      <PageNav />
    </article>
  );
}
