import { useState } from "react";
import { useRouter } from "next/router";

import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { useQuery } from "@tanstack/react-query";
import { getMyArticles, userArticles } from ".src/api/articles/articles";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

export default function UseMyPageWrite() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[0];

  const [filterOnSale, setFilterOnSale] = useState<string>("N");
  const [sort, setSort] = useState<string>("LATEST");

  const { data: postList } = useQuery({
    queryKey: ["writeByUser", sort, filterOnSale],
    queryFn: () =>
      getMyArticles(
        `?page=${0}&size=${20}&sortBy=${sort}&listedYn=${filterOnSale}`
      ),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  const onClickFilterOnSaleBtn = () =>
    setFilterOnSale((prev) => (prev === "Y" ? "N" : "Y"));

  const onSortList = () =>
    setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
    setSort,
    onSortList,
  };
}
