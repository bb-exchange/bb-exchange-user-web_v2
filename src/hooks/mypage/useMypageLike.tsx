import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { interestsArticles } from "@api/articles/articles";

export default function UseMyPageLike() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [postList, setPostList] = useState<mypageLikePosts[]>([]);
  const [sort, setSort] = useState<string>("LATEST");
  const [pageNum, setPageNum] = useState(0);

  const { data: interestsList } = useQuery({
    queryKey: ["purchaseArticles", sort, pageNum],
    queryFn: () => interestsArticles(`?page=${pageNum}&size=${20}&sortBy=${sort}`),
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });

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

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) => {
    setPageNum(pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    editMode,
    setEditMode,
    postList,
    onClickSelAllBtn,
    onClickDelBtn,
    onClickSelBtn,
    interestsList,
    onSortList,
    onChangePage,
  };
}
