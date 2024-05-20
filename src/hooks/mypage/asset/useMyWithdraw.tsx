import { useState } from "react";

import { D_myWithdrawList } from ".src/data/mypage/asset/D_myWithdraw";

export default function UseMyWithdraw() {
  const [dateText, setDateText] = useState<Date>(new Date());

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dataList, setDataList] = useState<myWithdraws[]>(D_myWithdrawList);

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

  return {
    selectedDate,
    onNextDate,
    onPrevDate,
    //
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dataList,
  };
}
