import styles from "./commonHeader.module.scss";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import WriteWhite from ".assets/icons/WriteWhite.svg";
import Shop from ".assets/icons/Shop.svg";
import Bell from ".assets/icons/Bell.svg";
import Hamburger from ".assets/icons/Hamburger.svg";
import TriangleDn from ".assets/icons/TriangleDn.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import { D_commonHeaderCategoryList } from ".src/data/common/header";
import useCommonHeader from ".src/hooks/common/useCommonHeader";
import PostCategoryPopup from "./postCategoryPopup";

interface Iprops {
  commonSort?: "인기" | "최신" | "상장";
}

export default function CommonHeader({ commonSort }: Iprops) {
  const customHook = useCommonHeader();

  return (
    <header className={styles.commonHeader}>
      <section className={styles.innerSec}>
        <article className={styles.topArea}>
          <div className={styles.leftCont}>
            <LogoBlue />
          </div>

          <div
            className={`${styles.rightCont} ${
              customHook.isSignedIn ? "login" : ""
            } `}
          >
            <button className={styles.writeBtn} onClick={() => {}}>
              <WriteWhite />
              <p>작성하기</p>
            </button>

            {customHook.isSignedIn ? (
              <>
                <Shop />

                <Bell />

                <img src={DefaultProfImg.src} alt="" />
              </>
            ) : (
              <button
                className={styles.authBtn}
                onClick={() => customHook.router.push("/auth/signin")}
              >
                <p>로그인/회원가입</p>
              </button>
            )}
          </div>
        </article>

        <article className={styles.bottomArea}>
          <div className={styles.leftCont}>
            <span className={styles.selBtnBox}>
              <button className={styles.categoryBtn}>
                <Hamburger />

                <div className={styles.valueBox}>
                  <p>전체 카테고리</p>
                  <TriangleDn />
                </div>
              </button>

              <PostCategoryPopup />
            </span>

            <ul className={styles.categoryList}>
              {D_commonHeaderCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={v.label === commonSort ? styles.on : ""}
                  onClick={() => customHook.router.push(`/${v.url}`)}
                >
                  <p>{v.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightCont}>
            <div className={styles.banner}>
              <p className={styles.cont}>
                {customHook.isSignedIn ? (
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
