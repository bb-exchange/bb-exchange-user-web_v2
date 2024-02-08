import { D_myContentIncomeList } from ".src/data/mypage/asset/D_myContentIncome";
import { useState } from "react";

export default function UseMyContentIncome() {
  const [contentTitle, setContentTitle] = useState<string>("");
  const [dataList, setDataList] = useState<myContentIncomes[]>(
    D_myContentIncomeList
  );

  return {
    contentTitle,
    setContentTitle,
    dataList,
  };
}
