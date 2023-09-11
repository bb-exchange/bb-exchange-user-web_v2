import styles from "./listed.module.scss";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import moment from "moment";
import "moment/locale/ko";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import { useRouter } from "next/router";
import useListed from ".src/hooks/posts/useListed";

export default function Listed() {
  const router = useRouter();
  const customHook = useListed();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <main className={styles.listed}>
        <section className={styles.postSec}>
          <ul className={styles.postList}>
            {customHook.dataList.map((v, i) => (
              <li key={i} onClick={() => router.push(`/post/${v.id}`)}>
                <div className={styles.leftArea}>
                  <div className={styles.infoCont}>
                    <div className={styles.titleBar}>
                      <h1
                        className={`${styles.title} ${
                          v.read ? styles.read : ""
                        }`}
                      >
                        {v.title}
                      </h1>
                      <p className={styles.replyCount}>{`[${
                        (v.replyCount || 0) > 99 ? `+99` : v.replyCount || 0
                      }]`}</p>
                    </div>

                    <div className={styles.infoBar}>
                      <div className={styles.categoryCont}>
                        <span className={styles.categoryImgBox}>
                          <img src={v.categoryImg.src} alt="" />
                        </span>

                        <p>{v.category}</p>
                      </div>

                      <p className={styles.creator}>
                        ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className={styles.thumbnailImgBox}>
                    {v.thumbnailUrl ? (
                      <img src={v.thumbnailUrl.src} alt="" />
                    ) : null}
                  </div>
                </div>

                <article className={styles.rightArea}>
                  {v.point ? (
                    <div
                      className={`${styles.priceCont} ${getDiffStyle(
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
                        v.point || 0
                      )} P`}</h1>
                    </div>
                  ) : (
                    <div className={styles.notListedCont}>
                      <div className={styles.likeCountBox}>
                        <p>{`좋아요 ${v.likeCount || 0}개`}</p>
                      </div>

                      <p className={styles.notListed}>비상장</p>
                    </div>
                  )}

                  <button
                    className={styles.favBtn}
                    onClick={(e) => customHook.onClickFavBtn(e, i)}
                  >
                    {v.isLike === true ? <HeartRedO /> : <HeartGrey />}
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
  return { props: { commonLayout: true, commonSort: "상장" } };
}
