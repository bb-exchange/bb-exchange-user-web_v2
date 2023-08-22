import styles from "./latest.module.scss";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import moment from "moment";
import "moment/locale/ko";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import UseLatest from ".src/hooks/posts/useLatest";
import { useRouter } from "next/router";

export default function Lastest() {
  const router = useRouter();
  const customHook = UseLatest();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <main className={styles.lastest}>
        <section className={styles.postSec}>
          <ul className={styles.postList}>
            {customHook.dataList.map((v, i) => (
              <li key={i} onClick={() => router.push(`/post/${v.articleInfo.articleId}`)}>
                <div className={styles.leftArea}>
                  <div className={styles.infoCont}>
                    <div className={styles.titleBar}>
                      <h1
                        className={`${styles.title} ${
                          v.articleInfo.read ? styles.read : ""
                        }`}
                      >
                        {v.articleInfo.title}
                      </h1>
                      <p className={styles.replyCount}>{`[${
                        (v.articleInfo.commentNum || 0) > 99 ? `+99` : v.articleInfo.commentNum || 0
                      }]`}</p>
                    </div>

                    <div className={styles.infoBar}>
                      <div className={styles.categoryCont}>
                        <span className={styles.categoryImgBox}>
                          <img src={v.categoryImg} alt="" />
                        </span>

                        <p>{v.boardInfo.description}</p>
                      </div>

                      <p className={styles.creator}>
                        ・{v.userInfo.nickname}・{moment(v.articleInfo.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className={styles.thumbnailImgBox}>
                    {v.articleInfo.thumbnail ? (
                      <img src={v.articleInfo.thumbnail} alt="" />
                    ) : null}
                  </div>
                </div>

                <article className={styles.rightArea}>
                  {v.articleInfo.purchased ? (
                    <div
                      className={`${styles.priceCont} ${getDiffStyle(
                        v.priceInfo.changeRate || 0
                      )}`}
                    >
                      <div className={styles.diffBox}>
                        <p>
                          {`${(v.priceInfo.changeRate || 0) > 0 ? "+" : ""}${
                            v.priceInfo.changeRate || 0
                          }% (${v.priceInfo.changeAmount || 0})`}
                        </p>
                      </div>

                      <h1
                        className={styles.price}
                      >{`${new Intl.NumberFormat().format(
                        v.priceInfo.price || 0
                      )} P`}</h1>
                    </div>
                  ) : (
                    <div className={styles.notListedCont}>
                      <div className={styles.likeCountBox}>
                        <p>{`좋아요 ${v.priceInfo.likeNum || 0}개`}</p>
                      </div>

                      <p className={styles.notListed}>비상장</p>
                    </div>
                  )}

                  <button
                    className={`${v.articleInfo.interest ? "" : styles.none} ${
                      styles.favBtn
                    }`}
                    onClick={(e) => customHook.onClickFavBtn(e, i)}
                  >
                    {v.articleInfo.interest === true ? <HeartRedO /> : <HeartGrey />}
                  </button>
                </article>
              </li>
            ))}
          </ul>

          <PageNav />
        </section>
      </main>

      <ScrollTopBtn />
    </>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true, commonSort: "최신" } };
}
