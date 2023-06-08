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
import { D_headerCategoryList } from ".src/data/common/header";

export default function CommonHeader() {
  const isLogin: boolean = false;

  const [search, setSearch] = useState<string>("");

  return (
    <header className={styles.commonHeader}>
      <section className={styles.innerSec}>
        <article className={styles.topArea}>
          <div className={styles.leftCont}>
            <LogoBlue />

            <div className={styles.searchBox}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="비법글을 검색해보세요"
              />

              <button className={styles.searchBtn} onClick={() => {}}>
                <MagnifyingGlass />
              </button>
            </div>
          </div>

          <div className={`${styles.rightCont} ${isLogin ? "login" : ""} `}>
            <button className={styles.writeBtn} onClick={() => {}}>
              <WriteWhite />
              <p>작성하기</p>
            </button>

            {isLogin ? (
              <>
                <Shop />

                <Bell />

                <img src={DefaultProfImg.src} alt="" />
              </>
            ) : (
              <button className={styles.authBtn} onClick={() => {}}>
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
              {D_headerCategoryList.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rightCont}>
            <div className={styles.banner}>
              <p className={styles.cont}>
                {isLogin ? (
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
