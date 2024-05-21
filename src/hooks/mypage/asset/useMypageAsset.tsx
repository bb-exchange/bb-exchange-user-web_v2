import { useState } from "react";

import { D_mypageAssetCategoryList } from ".src/data/mypage/asset/D_mypageAsset";

export default function UseMypageAsset() {
  const categoryList: string[] = D_mypageAssetCategoryList;

  const [category, setCategory] = useState<string>(categoryList[0]);

  return {
    categoryList,
    category,
    setCategory,
  };
}
