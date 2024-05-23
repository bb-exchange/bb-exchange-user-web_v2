import { useMemo, useState } from "react";

import { useRouter } from "next/router";

import { purchaseArticles } from ".src/api/articles/articles";
import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { D_filterCategoryList, D_mypageReadPostList } from ".src/data/mypage/D_mypageRead";
import { useQuery } from "@tanstack/react-query";

export default function UseMyPageRead() {
  const router = useRouter();
  const pageNum = Number(router.query.page ?? 0);

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[1];
  const filterCategoryList: string[] = D_filterCategoryList;

  const [filterCategroy, setFilterCategory] = useState<string>("전체");
  const [postList, setPostList] = useState<mypageReadPosts[]>(D_mypageReadPostList);
  const [sort, setSort] = useState<string>("LATEST");

  const search = useMemo(() => {
    return filterCategroy === "전체"
      ? "ALL"
      : filterCategroy === "유료"
        ? "PRICED"
        : filterCategroy === "무료"
          ? "FREE"
          : "NOT_READ";
  }, [filterCategroy]);

  const { data: purchaseList } = useQuery({
    queryKey: ["purchaseArticles", search, sort, pageNum],
    queryFn: () =>
      purchaseArticles(`?page=${pageNum}&size=${20}&searchType=${search}&sortBy=${sort}`),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  function onClickLikeBtn(i: number) {
    let _postList = postList;

    _postList[i].like = !!!_postList[i].like;
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
    postList,
    onClickLikeBtn,
    purchaseList,
    onSortList,
  };
}
