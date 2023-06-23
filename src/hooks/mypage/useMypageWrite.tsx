import { D_mypageCategoryList } from ".src/data/mypage/D_mypage";
import { D_mypageWritePostList } from ".src/data/mypage/D_mypageWrite";
import { useRouter } from "next/router";
import { useState } from "react";
import QuestionCircleRed from ".assets/icons/QuestionCircleRed.svg";

export default function UseMyPageWrite() {
  const router = useRouter();

  const categoryList: mypageCategory[] = D_mypageCategoryList;
  const category: mypageCategory = categoryList[0];
  const [filterOnSale, setFilterOnSale] = useState<boolean>(false);
  const [postList, setPostList] = useState<mypageWritePosts[]>(
    D_mypageWritePostList
  );

  console.log(postList.length);

  function onClickCategoryBtn(url: string) {
    router.push(`/mypage/${url}`);
  }

  function onClickFilterOnSaleBtn() {
    setFilterOnSale(!filterOnSale);
  }

  function getStateComp({ styles, state }: IwriteGetStateComp) {
    switch (state) {
      case "판매중":
        return (
          <div className={`${styles.blue} ${styles.stateBox}`}>
            <p className={styles.state}>판매중</p>
          </div>
        );
      case "비공개":
        return (
          <div className={styles.stateBox}>
            <p className={styles.state}>비공개</p>
          </div>
        );
      case "일시판매중지":
        return (
          <div className={`${styles.red} ${styles.stateBox}`}>
            <p className={styles.state}>판매중지</p>
            <div className={styles.explainBox}>
              <p>일시</p>
              <QuestionCircleRed />
            </div>
          </div>
        );
      case "영구판매중지":
        return (
          <div className={`${styles.red} ${styles.stateBox}`}>
            <p className={styles.state}>판매중지</p>
            <div className={styles.explainBox}>
              <p>영구</p>
              <QuestionCircleRed />
            </div>
          </div>
        );
    }
    return <></>;
  }

  return {
    categoryList,
    category,
    filterOnSale,
    onClickCategoryBtn,
    onClickFilterOnSaleBtn,
    postList,
    getStateComp,
  };
}
