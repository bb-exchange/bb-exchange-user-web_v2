import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";

// import UseLatest from ".src/hooks/posts/useLatest";

import styles from "./latest.module.scss";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";

import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";

import { articles } from ".src/api/articles/articles";

export default function Lastest() {
  const router = useRouter();

  // FIXME - API 연동끝나면 관련 코드 일괄 정리
  // const customHook = UseLatest();

  // TODO - 전역 상태
  const category = "ALL";
  const sortBy = "LATEST";

  const [page, setPage] = useState<number>(0);

  const { data: articleList } = useQuery({
    queryKey: ["articles", { category, sortBy, page }],
    queryFn: () => articles({ category, sortBy, page }),
  });

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  // TODO - 전역 유틸 함수로
  // NOTE - 다이나믹 url 이미지로더
  const imageLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => `${src}?w=${width}&q=${quality || 75}`;

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
                                loader={imageLoader}
                                src={boardInfo.image}
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
                            loader={imageLoader}
                            src={thumbnail}
                            width={120}
                            height={82}
                            style={{ objectFit: "cover" }}
                            alt="thumbnail"
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
                          // customHook.onClickFavBtn(e, i)
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

      <ScrollTopBtn />
    </>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true, commonSort: "최신" } };
}
