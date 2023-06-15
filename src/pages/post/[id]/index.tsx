import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./postScreen.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import CircleStarYellow from ".assets/icons/CircleStarYellow.svg";
import usePost from ".src/hooks/post/usePost";
import moment from "moment";
import "moment/locale/ko";

export default function Post() {
  const useCustomHook = usePost();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <CommonHeader />

      <main className={styles.postScreen}>
        <section className={styles.contSec}></section>

        <aside>
          <article className={styles.creatorArea}>
            <div className={styles.profImgBox}>
              <img src={DefaultProfImg.src} alt="" />
            </div>

            <div className={styles.nicknameBar}>
              <h1 className={styles.nickname}>치은짱짱맨</h1>
              <CircleStarYellow />
            </div>

            <p className={styles.profMsg}>
              {`재테크, 투자, 자동차 전문가입니다.
12년간 7개의 은행, 증권사, 투자은행을 다닌 경험이 있으며, 시드 2000천으로 현재 자산 58억 달성한 모든 비법을 공유합니다. 다들 따라오세요!!! 가보자구욧~!~!`}
            </p>
          </article>

          <article className={`${styles.otherPostArea} ${styles.postListArea}`}>
            <p className={styles.areaTitle}>치은짱짱맨님의 다른 글</p>

            <ul className={styles.postList}>
              {useCustomHook.otherPostList.map((v, i) => (
                <li key={i}>
                  <div className={styles.topBar}>
                    <p>
                      <strong className={styles.category}>{v.category}</strong>
                      ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                    </p>
                  </div>

                  <div className={styles.contBar}>
                    <div className={styles.leftCont}>
                      <p className={styles.title}>{v.title}</p>

                      <div className={styles.thumbnailBox}>
                        <img src={v.thumbnailUrl} alt="" />
                      </div>
                    </div>

                    <div
                      className={`${styles.rightCont} ${getDiffStyle(
                        v.percentOfChange || 0
                      )}`}
                    >
                      <p className={styles.diff}>
                        {`${(v.percentOfChange || 0) > 0 ? "+" : ""}${
                          v.percentOfChange || 0
                        }% (${v.amountOfChange || 0})`}
                      </p>

                      <p
                        className={styles.price}
                      >{`${new Intl.NumberFormat().format(v.point || 0)} 원`}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.categoryPopularPostList} ${styles.postListArea}`}>
            <p className={styles.areaTitle}>커리어 카테고리의 인기글</p>

            <ul className={styles.postList}>
              {useCustomHook.otherPostList.map((v, i) => (
                <li key={i}>
                  <div className={styles.topBar}>
                    <p>
                      <strong className={styles.category}>{v.category}</strong>
                      ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                    </p>
                  </div>

                  <div className={styles.contBar}>
                    <div className={styles.leftCont}>
                      <p className={styles.title}>{v.title}</p>

                      <div className={styles.thumbnailBox}>
                        <img src={v.thumbnailUrl} alt="" />
                      </div>
                    </div>

                    <div
                      className={`${styles.rightCont} ${getDiffStyle(
                        v.percentOfChange || 0
                      )}`}
                    >
                      <p className={styles.diff}>
                        {`${(v.percentOfChange || 0) > 0 ? "+" : ""}${
                          v.percentOfChange || 0
                        }% (${v.amountOfChange || 0})`}
                      </p>

                      <p
                        className={styles.price}
                      >{`${new Intl.NumberFormat().format(v.point || 0)} 원`}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </main>

      <CommonFooter />
    </>
  );
}
