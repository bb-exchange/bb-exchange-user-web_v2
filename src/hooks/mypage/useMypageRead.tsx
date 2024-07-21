import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { purchaseArticles } from "@api/articles/articles";

export default function UseMyPageRead() {
  const [postList, setPostList] = useState<mypageReadPosts[]>([]);
  const [sort, setSort] = useState<string>("LATEST");
  const [pageNum, setPageNum] = useState(0);

  const { data: purchaseList } = useQuery({
    queryKey: ["purchaseArticles", sort, pageNum],
    queryFn: () => purchaseArticles(`?page=${pageNum}&size=${20}&searchType=ALL&sortBy=${sort}`),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

  function onClickLikeBtn(i: number) {
    let _postList = postList;

    _postList[i].like = !!!_postList[i].like;
    setPostList([..._postList]);
  }

  const onSortList = () => setSort((prev) => (prev === "LATEST" ? "PRICE" : "LATEST"));

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) => {
    setPageNum(pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    postList,
    onClickLikeBtn,
    purchaseList,
    onSortList,
    onChangePage,
  };
}
