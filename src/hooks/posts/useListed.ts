import { fetchArticles } from ".src/api/articles/articles";
import { D_listedPostList } from ".src/data/posts/D_listed";
import { useQuery } from "@tanstack/react-query";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export default function useListed() {
  const router = useRouter();

  const [dataList, setDataList] = useState(D_listedPostList);

  const { data: postData } = useQuery({
    queryKey: ["listed", router.query.page || 1],
    queryFn: fetchArticles,
  });

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.stopPropagation();
    e.stopPropagation();

    let _dataList = dataList;

    if (_dataList[i].isLike) _dataList[i].isLike = false;
    else _dataList[i].isLike = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
