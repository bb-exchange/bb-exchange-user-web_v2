import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import {
  getProfitByMonth,
  getProfitContentsByMonth,
  getProfitEventByMonth,
  getSettlementWithdrawByMonth,
} from "@api/mypage/profit";

export default function UseMyTermIncome() {
  const thisMonth = moment().format("YYYYMM");
  const [month, setMonth] = useState(thisMonth);

  const onNextDate = () => {
    setMonth(moment(month).add(1, "M").format("YYYYMM"));
  };

  const onPrevDate = () => {
    setMonth(moment(month).subtract(1, "M").format("YYYYMM"));
  };

  // 더미데이타
  const revenueList = [
    { date: "2023.10.11", point: 1000 },
    { date: "2023.11.12", point: 2000 },
    // { date: "2023.11.13", point: 12000 },
  ];

  /**
   * 이벤트 수익금
   */
  const { data: profitEventLog } = useQuery({
    queryKey: ["getProfitEventByMonth", month],
    queryFn: () => getProfitEventByMonth({ month }),
  });

  /**
   * 월별 수익금
   */
  const { data: profitLog } = useQuery({
    queryKey: ["getProfitByMonth", month],
    queryFn: () => getProfitByMonth({ month }),
  });

  /**
   * 컨텐츠별 수익금
   */
  const { data: profitContentLog } = useQuery({
    queryKey: ["getProfitContentsByMonth"],
    queryFn: () => getProfitContentsByMonth(),
  });

  /**
   * 출금내역
   */
  const { data: settlementWithdrawLog } = useQuery({
    queryKey: ["getSettlementWithdrawByMonth", month],
    queryFn: () => getSettlementWithdrawByMonth({ month }),
  });

  return {
    revenueList,
    onNextDate,
    onPrevDate,
    profitEventLog,
    profitLog,
    month,
    profitContentLog,
    settlementWithdrawLog,
  };
}
