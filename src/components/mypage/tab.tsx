import styles from "./tab.module.scss";

import { useRouter } from "next/router";

import UseMyPageWrite from "@hooks/mypage/useMypageWrite";

export default function Tab() {
  const router = useRouter();

  const useMypageWrite = UseMyPageWrite();

  return (
    <div className={styles.leftCont}>
      <ul className={styles.categoryList}>
        {useMypageWrite.categoryList.map((v, i) => {
          return (
            <li
              key={i}
              className={router.pathname === v.path ? styles.on : ""}
              onClick={() => useMypageWrite.onClickCategoryBtn(v.url)}
            >
              <p>{v.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
