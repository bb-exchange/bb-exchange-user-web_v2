import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/ko";

import styles from "./popular.module.scss";
import PolygonUpRedO from ".assets/icons/PolygonUpRedO.svg";
import PolygonDnBlueO from ".assets/icons/PolygonDnBlueO.svg";
import HorizonBarGrey from ".assets/icons/HorizonBarGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import UsePopular from ".src/hooks/posts/usePopular";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import { isLoginState } from ".src/recoil";
import { useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";

export default function Popular() {
  const router = useRouter();
  const usePopular = UsePopular();

  const isLogin = useRecoilValue(isLoginState);
  const [requestLoginPop, setRequestLoginPop] = useState<boolean>(false);

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  function getRankDiffIcon(diff: number) {
    if (diff > 0) return <PolygonUpRedO />;
    else if (diff < 0) return <PolygonDnBlueO />;
    else return <HorizonBarGrey />;
  }

  // NOTE 찜하기 버튼 클릭
  const onClickFavBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isLogin) {
      // TODO 로그인 상태일 경우, 찜하기 기능 구현
    } else {
      setRequestLoginPop(true);
    }
  };

  return (
    <>
      <main className={styles.popular}>
        <section className={styles.postSec}>
          <ul className={styles.postList} data-cy="postList">
            {usePopular.dataList.map((v: any, i: number) => (
              <li key={i} onClick={() => router.push(`/post/${v.id}`)}>
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
                    data-js="favBtn"
                    // onClick={(e) => usePopular.onClickFavBtn(e, i)}
                    onClick={(e) => onClickFavBtn(e)}
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

      {requestLoginPop && (
        <>
          <ConfirmPopup
            title="로그인해 주세요"
            content="해당 기능은 로그인이 필요해요"
            confirmText="로그인하기"
            confirmFunc={() => router.push("/auth/signin")}
            cancelText="취소"
            cancelFunc={() => setRequestLoginPop(false)}
          />
          <PopupBg bg off={() => setRequestLoginPop(false)} />
        </>
      )}

      <ScrollTopBtn />
    </>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true, commonSort: "인기" } };
}
