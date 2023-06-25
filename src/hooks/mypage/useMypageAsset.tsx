import {
  D_mypageAssetCategoryList,
  D_revenueList,
} from ".src/data/mypage/D_mypageAsset";
import { useState } from "react";

export default function UseMypageAsset() {
  const categoryList: string[] = D_mypageAssetCategoryList;

  const [category, setCategory] = useState<string>(categoryList[0]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [revenuList, setRevenueList] = useState<myRevenues[]>(D_revenueList);

  return {
    categoryList,
    category,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    revenuList,
  };
}
