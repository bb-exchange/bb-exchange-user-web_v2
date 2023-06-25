import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { D_mypageLikePostList } from ".src/data/mypage/D_mypageLike";
import { D_filterCategoryList } from ".src/data/mypage/D_mypageRead";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UseMyPageLike() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[2];
  const filterCategoryList: string[] = D_filterCategoryList;
  const [filterCategroy, setFilterCategory] = useState<string>(
    D_filterCategoryList[0]
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [postList, setPostList] =
    useState<mypageLikePosts[]>(D_mypageLikePostList);

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  function onClickSelAllBtn() {
    let _postList = postList;

    if (_postList.some((e) => e.sel !== true))
      _postList.forEach((e) => (e.sel = true));
    else _postList.forEach((e) => (e.sel = false));
    setPostList([..._postList]);
  }

  function onClickDelBtn() {
    setEditMode(false);
  }

  function onClickSelBtn(i: number) {
    let _postList = postList;

    _postList[i].sel = !!!_postList[i].sel;
    setPostList([..._postList]);
  }

  return {
    categoryList,
    category,
    filterCategoryList,
    filterCategroy,
    setFilterCategory,
    onClickCategoryBtn,
    editMode,
    setEditMode,
    postList,
    onClickSelAllBtn,
    onClickDelBtn,
    onClickSelBtn,
  };
}
