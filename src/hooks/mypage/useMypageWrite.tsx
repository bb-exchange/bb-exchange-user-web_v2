import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { useQuery } from "@tanstack/react-query";
import { userArticles } from ".src/api/articles/articles";
import { queryKeys } from ".src/recoil/query-keys";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

export default function UseMyPageWrite() {
  const router = useRouter();
  const profile = useGetMyProfile();

  const categoryList: mypageCategory[] = D_mypagePostCategoryList;
  const category: mypageCategory = categoryList[0];

  const [filterOnSale, setFilterOnSale] = useState<boolean>(false);
  // const [postList, setPostList] = useState<mypageWritePosts[]>([]);

  // useQuery(
  //   queryKeys.articleById("writeByUser"),
  //   () => userArticles(`${profile?.userId}?sortBy=LATEST&page=0`),
  //   {
  //     enabled: !!profile,
  //     onSuccess: (data) => {
  //       setPostList(data?.data.data.contents);
  //     },
  //     retry: false,
  //   }
  // );

  const { data: postList } = useQuery({
    queryKey: queryKeys.articleById("writeByUser"),
    queryFn: () => userArticles(`${profile?.userId}?sortBy=LATEST&page=0`),
    enabled: !!profile,
    select: (res) => res.data.data.contents ?? [],
  });

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  const onClickFilterOnSaleBtn = () => setFilterOnSale((prev) => !prev);

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
  };
}
