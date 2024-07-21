import styles from "./mypage.module.scss";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import ProfSec from "@components/mypage/profSec";

import UseMyPageWrite from "@hooks/mypage/useMypageWrite";

export default function Mypage() {
  const router = useRouter();
  const useMypageWrite = UseMyPageWrite();
  const DynamicComponent = dynamic(
    () => import(`@components/mypage/postList/${useMypageWrite.selectedTab}`),
    { loading: () => <div>loading...</div> },
  );

  return (
    <>
      <CommonHeader />

      <main className={styles.mypageWrite}>
        <ProfSec />

        <section className={styles.postSec}>
          <ul className={styles.categoryList}>
            {useMypageWrite.categoryList.map((v, i) => {
              return (
                <li
                  key={i}
                  className={useMypageWrite.selectedTab === v.key ? styles.on : ""}
                  onClick={() => useMypageWrite.onClickTab(v.key)}
                >
                  <p>{v.label}</p>
                </li>
              );
            })}
          </ul>

          {useMypageWrite.categoryList.map((category) => {
            if (category.key === useMypageWrite.selectedTab) {
              return <DynamicComponent key={category.key} />;
            }
          })}
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
