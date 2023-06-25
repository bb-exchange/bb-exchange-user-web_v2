import { D_myWithdrawList } from ".src/data/mypage/asset/D_myWithdraw";
import { useState } from "react";

export default function UseMyWithdraw() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dataList, setDataList] = useState<myWithdraws[]>(D_myWithdrawList);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dataList,
  };
}
