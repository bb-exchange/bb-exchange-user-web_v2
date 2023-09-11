import { fetchArticles } from ".src/api/articles/articles";
import { D_popularPostList } from ".src/data/posts/D_popular";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UsePopular() {
  const router = useRouter();

  
  const [dataList, setDataList] = useState(D_popularPostList);

  const { data: postData } = useQuery(
    ["popular", router.query.page || 1],
    fetchArticles,
    {
      retry: false,
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.stopPropagation();

    let _dataList = dataList;

    if (_dataList[i].isLike) _dataList[i].isLike = false;
    else _dataList[i].isLike = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
