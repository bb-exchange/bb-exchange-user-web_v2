import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./mypage.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import ProfSec from ".src/components/mypage/profSec";
import UseMyPageWrite from ".src/hooks/mypage/useMypageWrite";
import BtnSqrChk from ".assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from ".assets/icons/BtnSqrChkOn.svg";
import Swap from ".assets/icons/Swap.svg";
import moment from "moment";
import "moment/locale/ko";
import PageNav from ".src/components/common/pageNav";

export default function Mypage() {
  const useMypageWrite = UseMyPageWrite();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <CommonHeader />

      <main className={styles.mypage}>
        <ProfSec />

        <section className={styles.postSec}>
          <article className={styles.toolBar}>
            <div className={styles.leftCont}>
              <ul className={styles.categoryList}>
                {useMypageWrite.categoryList.map((v, i) => (
                  <li
                    key={i}
                    className={
                      v.label === useMypageWrite.category.label ? styles.on : ""
                    }
                    onClick={() => useMypageWrite.onClickCategoryBtn(v.url)}
                  >
                    <p>
                      {v.label} {v.count || 0}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightCont}>
              <button
                className={`${styles.filterOnSaleBtn} ${styles.utilBtn}`}
                onClick={useMypageWrite.onClickFilterOnSaleBtn}
              >
                {useMypageWrite.filterOnSale ? <BtnSqrChkOn /> : <BtnSqrChk />}

                <p>판매중인 글만 보기</p>
              </button>

              <button
                className={`${styles.sortBtn} ${styles.utilBtn}`}
                onClick={() => {}}
              >
                <Swap />

                <p>최신순</p>
              </button>
            </div>
          </article>

          <ul className={styles.postList}>
            {useMypageWrite.postList.map((v, i) => (
              <li key={i}>
                <div className={styles.leftCont}>
                  <div className={styles.infoCont}>
                    <div className={styles.thumbBox}>
                      <div className={styles.titleBar}>
                        <p
                          className={`${styles.title} ${
                            v.read ? styles.read : ""
                          }`}
                        >
                          {v.title}
                        </p>

                        <p className={styles.replyCount}>{`[${
                          (v.replyCount || 0) > 99 ? `+99` : v.replyCount || 0
                        }]`}</p>
                      </div>

                      <div className={styles.infoBar}>
                        <p className={styles.category}>{v.category}</p>・
                        <p className={styles.createdAt}>
                          {moment(v.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <ul className={styles.amountList}>
                      <li>
                        <p className={styles.key}>좋아요</p>&nbsp;
                        <p className={styles.value}>
                          {(v.likeCount || 0) > 999999
                            ? "999,999+"
                            : v.likeCount}
                        </p>
                      </li>

                      <li>
                        <p className={styles.key}>총수익</p>&nbsp;
                        <p className={styles.value}>
                          {`${Intl.NumberFormat().format(v.revenue || 0)}원`}
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.thumbnailImgBox}>
                    {v.thumbnailUrl ? (
                      <img src={v.thumbnailUrl} alt="" />
                    ) : null}
                  </div>
                </div>

                <div className={styles.rightCont}>
                  {v.price ? (
                    <div
                      className={`${styles.priceBox} ${getDiffStyle(
                        v.percentOfChange || 0
                      )}`}
                    >
                      <div className={styles.diffBox}>
                        <p>
                          {`${(v.percentOfChange || 0) > 0 ? "+" : ""}${
                            v.percentOfChange || 0
                          }% (${v.amountOfChange || 0})`}
                        </p>
                      </div>

                      <h1
                        className={styles.price}
                      >{`${new Intl.NumberFormat().format(
                        v.price || 0
                      )} P`}</h1>
                    </div>
                  ) : (
                    <div className={styles.notListedBox}>
                      <div className={styles.likeCountBox}>
                        <p>{`좋아요 ${v.likeCount || 0}개`}</p>
                      </div>

                      <p className={styles.notListed}>비상장</p>
                    </div>
                  )}

                  {useMypageWrite.getStateComp({ styles, state: v.state })}
                </div>
              </li>
            ))}
          </ul>

          <PageNav/>
        </section>
      </main>

      <CommonFooter />
    </>
  );
}
