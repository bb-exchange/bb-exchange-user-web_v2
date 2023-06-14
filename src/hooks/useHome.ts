import { D_homePostList } from ".src/data/home/D_posts";
import { useState } from "react";

export default function useHome() {
  const [dataList, setDataList] = useState(D_homePostList);

  function onClickFavBtn(e: React.MouseEvent, i: number) {
    e.preventDefault();

    let _dataList = dataList;

    if (_dataList[i].isLike) _dataList[i].isLike = false;
    else _dataList[i].isLike = true;

    setDataList([..._dataList]);
  }

  return { dataList, onClickFavBtn };
}
