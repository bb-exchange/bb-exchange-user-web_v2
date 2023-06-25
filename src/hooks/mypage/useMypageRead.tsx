import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import {
  D_filterCategoryList,
  D_mypageReadPostList,
} from ".src/data/mypage/D_mypageRead";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UseMyPageRead() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
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

  function onClickLikeBtn(i: number) {
    let _postList = postList;

    _postList[i].like = !!!_postList[i].like;
    setPostList([..._postList]);
  }

  return {
    categoryList,
    category,
    filterCategoryList,
    filterCategroy,
    setFilterCategory,
    onClickCategoryBtn,
    postList,
    onClickLikeBtn,
  };
}
