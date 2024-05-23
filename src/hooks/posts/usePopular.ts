import { useState } from "react";

import { useRouter } from "next/router";

import { fetchArticles } from ".src/api/articles/articles";
import { D_popularPostList } from ".src/data/posts/D_popular";
import { useQuery } from "@tanstack/react-query";

export default function UsePopular() {
  const router = useRouter();

  const [dataList, setDataList] = useState(D_popularPostList);

  const { data: postData } = useQuery({
    queryKey: ["popular", router.query.page || 1],
    queryFn: fetchArticles,
  });

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.stopPropagation();

    let _dataList = dataList;

    if (_dataList[i].isLike) _dataList[i].isLike = false;
    else _dataList[i].isLike = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
