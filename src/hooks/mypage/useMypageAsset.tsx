import { D_mypageAssetCategoryList } from ".src/data/mypage/D_mypageAsset";
import { useState } from "react";

export default function UseMypageAsset() {
  const categoryList: string[] = D_mypageAssetCategoryList;
  const [category, setCategory] = useState<string>(categoryList[0]);

  return { categoryList, category, setCategory };
}
