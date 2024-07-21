import { useState } from "react";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

import { getMyArticles } from "@api/articles/articles";

import { D_mypagePostCategoryList } from "@data/mypage/D_mypage";

export default function UseMyPageWrite() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[0];
  const [selectedTab, setSelectedTab] = useState<string>("written");
  const [filterOnSale, setFilterOnSale] = useState<string>("N");
  const [sort, setSort] = useState<string>("LATEST");
  const [pageNum, setPageNum] = useState(0);

  const { data: postList } = useQuery({
    queryKey: ["writeByUser", sort, filterOnSale, pageNum],
    queryFn: () =>
      getMyArticles(`?page=${pageNum}&size=${20}&sortBy=${sort}&listedYn=${filterOnSale}`),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  const onClickTab = (key: string) => {
    setSelectedTab(key);
  };

  const onClickFilterOnSaleBtn = () => setFilterOnSale((prev) => (prev === "Y" ? "N" : "Y"));

  const onSortList = () => setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) => {
    setPageNum(pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
    setSort,
    onSortList,
    selectedTab,
    setSelectedTab,
    onClickTab,
    onChangePage,
  };
}
