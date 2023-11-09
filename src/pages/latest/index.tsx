import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import moment from "moment";
import "moment/locale/ko";

// import UseLatest from ".src/hooks/posts/useLatest";
import { articles } from ".src/api/articles/articles";
import { categoryState, isLoginState } from ".src/recoil";

import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import Image from ".src/components/Image";
import PopupBg from ".src/components/common/popupBg";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";

import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import styles from "./latest.module.scss";

export default function Lastest() {
  // FIXME - API 연동끝나면 관련 코드 일괄 정리
  // const customHook = UseLatest();

  const router = useRouter();

  const sortBy = "LATEST";
  const category = useRecoilValue(categoryState);
  const isLogin = useRecoilValue(isLoginState);

  const [page, setPage] = useState<number>(0);
  const [requestLoginPop, setRequestLoginPop] = useState<boolean>(false);

  const { data: articleList } = useQuery({
    queryKey: ["articles", { category, sortBy, page }],
    queryFn: () => articles({ category, sortBy, page }),
  });

  // TODO 리스트 새로 불러올 때마다 초기화해야됨
  const [imageLoadError, setImageLoadError] = useState<Set<number>>(new Set());

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  // NOTE 찜하기 버튼 클릭
  const onClickFavBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    articleId: number
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
      <main className={styles.lastest}>
        <section className={styles.postSec}>
          <ul className={styles.postList} data-cy="postList">
            {articleList?.contents?.map(
              ({
                boardInfo,
                userInfo: { nickname },
                articleInfo: {
                  articleId,
                  read,
                  title,
                  // 댓글 수
                  commentNum,
                  updatedAt,
                  thumbnail,
                  // 찜
                  interest,
                },
                priceInfo: {
                  // 좋아요 수
                  likeNum,
                  // 포인트
                  price,
                  // 변동 포인트 값
                  changeAmount,
                  // 변동률
                  changeRate,
                },
              }) => {
                return (
                  <li
                    key={articleId}
                    onClick={() => router.push(`/post/${articleId}`)}
                  >
                    <div className={styles.leftArea}>
                      <div className={styles.infoCont}>
                        <div className={styles.titleBar}>
                          <h1
                            className={`${styles.title} ${
                              read ? styles.read : ""
                            }`}
                          >
                            {title}
                          </h1>
                          <p className={styles.replyCount}>{`[${
                            (commentNum || 0) > 99 ? `+99` : commentNum || 0
                          }]`}</p>
                        </div>

                        <div className={styles.infoBar}>
                          <div className={styles.categoryCont}>
                            <span className={styles.categoryImgBox}>
                              <Image
                                src={boardInfo.image}
                                loader
                                width={24}
                                height={24}
                                alt="catImg"
                              />
                            </span>

                            <p>{boardInfo.description}</p>
                          </div>

                          <p className={styles.creator}>
                            ・{nickname}・{moment.utc(updatedAt).fromNow()}
                          </p>
                        </div>
                      </div>

                      <div className={styles.thumbnailImgBox}>
                        {thumbnail && (
                          <Image
                            src={thumbnail}
                            loader
                            priority
                            width={120}
                            height={82}
                            style={{ objectFit: "cover" }}
                            alt=""
                            isError={imageLoadError.has(articleId)}
                            onError={() =>
                              setImageLoadError(
                                new Set(imageLoadError).add(articleId)
                              )
                            }
                          />
                        )}
                      </div>
                    </div>

                    <article className={styles.rightArea}>
                      {price ? (
                        <div
                          className={`${styles.priceCont} ${getDiffStyle(
                            changeRate || 0
                          )}`}
                        >
                          <div className={styles.diffBox}>
                            <p>
                              {`${(changeRate || 0) > 0 ? "+" : ""}${
                                changeRate || 0
                              }% (${changeAmount || 0})`}
                            </p>
                          </div>

                          <h1
                            className={styles.price}
                          >{`${new Intl.NumberFormat().format(
                            price || 0
                          )} P`}</h1>
                        </div>
                      ) : (
                        <div className={styles.notListedCont}>
                          <div className={styles.likeCountBox}>
                            <p>{`좋아요 ${likeNum || 0}개`}</p>
                          </div>

                          <p className={styles.notListed}>비상장</p>
                        </div>
                      )}

                      <button
                        className={styles.favBtn}
                        data-js="favBtn"
                        onClick={(e) => {
                          onClickFavBtn(e, articleId);
                        }}
                      >
                        {interest ? <HeartRedO /> : <HeartGrey />}
                      </button>
                    </article>
                  </li>
                );
              }
            )}
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
  return { props: { commonLayout: true, commonSort: "최신" } };
}
