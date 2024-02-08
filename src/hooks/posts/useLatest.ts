import { fetchArticles } from ".src/api/articles/articles";
import { D_latestPostList } from ".src/data/posts/D_latest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UseLatest() {
  const router = useRouter();

  const [dataList, setDataList] = useState<any[]>(D_latestPostList);
  // const [dataList, setDataList] = useState<IpostList[]>([]);

  // const { data: postData } = useQuery(
  //   ["latest", router.query.page || 0],
  //   fetchArticles,
  //   {
  //     retry: false,
  //     onSuccess: (res) => {
  //       console.log(res.data);
  //       setDataList(res.data?.data?.contents);
  //     },
  //   }
  // );

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.stopPropagation();

    let _dataList = dataList;

    if (_dataList[i].articleInfo.interest)
      _dataList[i].articleInfo.interest = false;
    else _dataList[i].articleInfo.interest = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
