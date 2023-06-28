import styles from "./popular.module.scss";
import PolygonUpRedO from ".assets/icons/PolygonUpRedO.svg";
import PolygonDnBlueO from ".assets/icons/PolygonDnBlueO.svg";
import HorizonBarGrey from ".assets/icons/HorizonBarGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import moment from "moment";
import "moment/locale/ko";
import UsePopular from ".src/hooks/posts/usePopular";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import { useRouter } from "next/router";

export default function Popular() {
  const router = useRouter();
  const usePopular = UsePopular();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  function getRankDiffIcon(diff: number) {
    if (diff > 0) return <PolygonUpRedO />;
    else if (diff < 0) return <PolygonDnBlueO />;
    else return <HorizonBarGrey />;
  }

  return (
    <>
      <main className={styles.popular}>
        <section className={styles.postSec}>
          <ul className={styles.postList}>
            {usePopular.dataList.map((v, i) => (
              <li key={i} onClick={() => router.push(`/post/${i}`)}>
                <div className={styles.leftArea}>
                  <div className={styles.rankCont}>
                    <h2 className={styles.rank}>{i + 1}</h2>

                    <div
                      className={`${styles.diffBox} ${getDiffStyle(
                        v.rankDiff || 0
                      )}`}
                    >
                      {getRankDiffIcon(v.rankDiff || 0)}

                      <p>{Math.abs(v.rankDiff || 0)}</p>
                    </div>
                  </div>

                  <div className={styles.infoCont}>
                    <div className={styles.titleBar}>
                      <h1 className={styles.title}>{v.title}</h1>
                      <p className={styles.replyCount}>{`[${
                        (v.replyCount || 0) > 99 ? `+99` : v.replyCount || 0
                      }]`}</p>
                    </div>

                    <div className={styles.infoBar}>
                      <div className={styles.categoryCont}>
                        <span className={styles.categoryImgBox}>
                          <img src={v.categoryImg} alt="" />
                        </span>

                        <p>{v.category}</p>
                      </div>
                      ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                    </div>
                  </div>

                  <div className={styles.thumbnailImgBox}>
                    {v.thumbnailUrl ? (
                      <img src={v.thumbnailUrl} alt="" />
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
                    onClick={(e) => usePopular.onClickFavBtn(e, i)}
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
  return { props: { commonLayout: true, commonSort: "인기" } };
}
