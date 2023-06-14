import styles from "./home.module.scss";
import PolygonUpRedO from ".assets/icons/PolygonUpRedO.svg";
import PolygonDnBlueO from ".assets/icons/PolygonDnBlueO.svg";
import HorizonBarGrey from ".assets/icons/HorizonBarGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import moment from "moment";
import "moment/locale/ko";
import useHome from ".src/hooks/useHome";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";

export default function Home() {
  const customHook = useHome();

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
      <main className={styles.home}>
        <section className={styles.postSec}>
          <ul className={styles.postList}>
            {customHook.dataList.map((v, i) => (
              <li key={i}>
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
                    >{`${new Intl.NumberFormat().format(v.point || 0)} P`}</h1>
                  </div>

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
  return { props: { commonLayout: true } };
}
