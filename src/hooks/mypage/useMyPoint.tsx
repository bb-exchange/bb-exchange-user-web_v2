import { useState } from "react";

import { D_mypagePointCategoryList } from ".src/data/mypage/D_mypage";

export default function UseMyPoint() {
  const [category, setCategory] = useState<string>(D_mypagePointCategoryList[0]);
  const [dataList, setDataList] = useState<IpointHistorys[]>([]);

  return { category, setCategory, dataList };
}
