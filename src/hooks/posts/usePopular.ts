import { D_popularPostList } from ".src/data/posts/D_popular";
import { useState } from "react";

export default function usePopular() {
  const [dataList, setDataList] = useState(D_popularPostList);

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
