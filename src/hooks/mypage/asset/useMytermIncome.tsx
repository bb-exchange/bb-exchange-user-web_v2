import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getProfitByMonth, getProfitEventByMonth } from "@api/mypage/profit";

export default function UseMyTermIncome() {
  const [dateText, setDateText] = useState<Date>(new Date());

  const onNextDate = () => {
    const nextMonth = new Date(dateText);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDateText(nextMonth);
  };

  const onPrevDate = () => {
    const nextMonth = new Date(dateText);
    nextMonth.setMonth(nextMonth.getMonth() - 1);
    setDateText(nextMonth);
  };

  const options: any = { year: "numeric", month: "numeric" };
  const selectedDate = dateText.toLocaleDateString("ko-KR", options).slice(0, -1);

  // 더미데이타
  const revenueList = [
    { date: "2023.10.11", point: 1000 },
    { date: "2023.11.12", point: 2000 },
    // { date: "2023.11.13", point: 12000 },
  ];

  /**
   * 이벤트 수익금
   */
  const [month, setMonth] = useState("202406");
  const { data: profitEventLog } = useQuery({
    queryKey: ["getProfitEventByMonth"],
    queryFn: () => getProfitEventByMonth({ month }),
  });

  /**
   * 월별 수익금
   */
  const { data: profitLog } = useQuery({
    queryKey: ["getProfitByMonth"],
    queryFn: () => getProfitByMonth({ month }),
  });

  return {
    revenueList,
    selectedDate,
    onNextDate,
    onPrevDate,
    profitEventLog,
    profitLog,
  };
}
