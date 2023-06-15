import { D_latestPostList } from ".src/data/posts/D_latest";
import { useState } from "react";

export default function useLastest() {
  const [dataList, setDataList] = useState(D_latestPostList);

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.preventDefault();

    let _dataList = dataList;

    if (_dataList[i].isLike) _dataList[i].isLike = false;
    else _dataList[i].isLike = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
