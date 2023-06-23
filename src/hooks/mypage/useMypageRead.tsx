import { D_mypageCategoryList } from ".src/data/mypage/D_mypage";
import {
  D_filterCategoryList,
  D_mypageReadPostList,
} from ".src/data/mypage/D_mypageRead";
import { D_mypageWritePostList } from ".src/data/mypage/D_mypageWrite";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UseMyPageRead() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypageCategoryList;
  const category: mypageCategory = categoryList[1];
  const filterCategoryList: string[] = D_filterCategoryList;
  const [filterCategroy, setFilterCategory] = useState<string>(
    D_filterCategoryList[0]
  );
  const [postList, setPostList] =
    useState<mypageReadPosts[]>(D_mypageReadPostList);

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  return {
    categoryList,
    category,
    filterCategoryList,
    filterCategroy,
    setFilterCategory,
    onClickCategoryBtn,
    postList,
  };
}
