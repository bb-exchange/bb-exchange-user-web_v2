
import { D_termIncomeList } from ".src/data/mypage/asset/D_myTermIncome";
import { useState } from "react";

export default function UseMyTermIncome() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dataList, setDataList] = useState<myTermIncomes[]>(D_termIncomeList);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dataList,
  };
}
