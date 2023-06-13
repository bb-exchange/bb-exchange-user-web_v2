import styles from "./commonHeader.module.scss";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import MagnifyingGlass from ".assets/icons/MagnifyingGlass.svg";
import WriteWhite from ".assets/icons/WriteWhite.svg";
import Shop from ".assets/icons/Shop.svg";
import Bell from ".assets/icons/Bell.svg";
import Hamburger from ".assets/icons/Hamburger.svg";
import TriangleDn from ".assets/icons/TriangleDn.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import { useState } from "react";
import { D_commonHeaderCategoryList } from ".src/data/common/header";
import { useSelector } from "react-redux";
import { AppStore } from ".src/app/store";
import { useRouter } from "next/router";

export default function CommonHeader() {
  const isSignedIn = useSelector((state: AppStore) => state.user.isSignedIn);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  return (
    <header className={styles.commonHeader}>
      <section className={styles.innerSec}>
        <article className={styles.topArea}>
          <div className={styles.leftCont}>
            <LogoBlue />
          </div>

          <div className={`${styles.rightCont} ${isSignedIn ? "login" : ""} `}>
            <button className={styles.writeBtn} onClick={() => {}}>
              <WriteWhite />
              <p>작성하기</p>
            </button>

            {isSignedIn ? (
              <>
                <Shop />

                <Bell />

                <img src={DefaultProfImg.src} alt="" />
              </>
            ) : (
              <button
                className={styles.authBtn}
                onClick={() => router.push("/auth/signin")}
              >
                <p>로그인/회원가입</p>
              </button>
            )}
          </div>
        </article>

        <article className={styles.bottomArea}>
          <div className={styles.leftCont}>
            <button className={styles.categoryBtn} onClick={() => {}}>
              <Hamburger />

              <div className={styles.valueBox}>
                <p>전체 카테고리</p>
                <TriangleDn />
              </div>
            </button>

            <ul className={styles.categoryList}>
              {D_commonHeaderCategoryList.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rightCont}>
            <div className={styles.banner}>
              <p className={styles.cont}>
                {isSignedIn ? (
                  <>
                    <strong className={styles.nickname}>치은짱짱맨</strong>님,
                  </>
                ) : (
                  <></>
                )}
                나만의 비법, 지식, 경험을 공유하고 수익을 창출해 보세요!
              </p>
              <ChevronRt />
            </div>
          </div>
        </article>
      </section>
    </header>
  );
}
