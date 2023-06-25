import { D_mypagePointCategoryList } from ".src/data/mypage/D_mypage";
import { D_pointHistoryList } from ".src/data/mypage/asset/D_mypagePoint";
import { useState } from "react";

export default function UseMyPoint() {
  const categoryList: string[] = D_mypagePointCategoryList;

  const [category, setCategory] = useState<string>(
    D_mypagePointCategoryList[0]
  );
  const [dataList, setDataList] =
    useState<IpointHistorys[]>(D_pointHistoryList);

  return { categoryList, category, setCategory, dataList };
}
