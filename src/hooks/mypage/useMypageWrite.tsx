import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { D_mypageWritePostList } from ".src/data/mypage/D_mypageWrite";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UseMyPageWrite() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[0];
  const [filterOnSale, setFilterOnSale] = useState<boolean>(false);
  const [postList, setPostList] = useState<mypageWritePosts[]>(
    D_mypageWritePostList
  );

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  function onClickFilterOnSaleBtn() {
    setFilterOnSale(!filterOnSale);
  }

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
  };
}
