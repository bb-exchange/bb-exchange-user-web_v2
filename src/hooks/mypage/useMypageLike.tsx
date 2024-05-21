import { useState } from "react";

import { useRouter } from "next/router";

import { interestsArticles } from ".src/api/articles/articles";
import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { D_filterCategoryList } from ".src/data/mypage/D_mypageRead";
import { useQuery } from "@tanstack/react-query";

export default function UseMyPageLike() {
  const router = useRouter();
  const pageNum = Number(router.query.page ?? 0);

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[2];
  const filterCategoryList: string[] = D_filterCategoryList;
  const [filterCategroy, setFilterCategory] = useState<string>(D_filterCategoryList[0]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [postList, setPostList] = useState<mypageLikePosts[]>([]);
  const [sort, setSort] = useState<string>("LATEST");

  const { data: interestsList } = useQuery({
    queryKey: ["purchaseArticles", sort, pageNum],
    queryFn: () => interestsArticles(`?page=${pageNum}&size=${20}&sortBy=${sort}`),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  function onClickSelAllBtn() {
    let _postList = postList;

    if (_postList.some((e) => e.sel !== true)) _postList.forEach((e) => (e.sel = true));
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

  const onSortList = () => setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

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
    interestsList,
    onSortList,
  };
}
