import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { D_mypagePostCategoryList } from ".src/data/mypage/D_mypage";
import { D_mypageWritePostList } from ".src/data/mypage/D_mypageWrite";

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

  const onClickFilterOnSaleBtn = () => setFilterOnSale((prev) => !prev);

  useEffect(() => {
    if (filterOnSale) {
      setPostList(postList.filter((val) => val.state === "판매중"));
    } else {
      setPostList(D_mypageWritePostList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOnSale]);

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
  };
}
