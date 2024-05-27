import styles from "./popular.module.scss";

import { useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";
import { useRecoilValue } from "recoil";

import HeartGrey from "@assets/icons/HeartGrey.svg";
import HeartRedO from "@assets/icons/HeartRedO.svg";

import { articles } from "@api/articles/articles";

import PageNav from "@components/common/pageNav";
import ConfirmPopup from "@components/common/popup/confirmPopup";
import PopupBg from "@components/common/popupBg";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import Image from "@components/Image";

import { useArticles } from "@hooks/posts/useArticles";

import { categoryState, isLoginState } from "@recoil/index";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  const defaultValues = {
    category: "ALL",
    searchType: "POPULAR" as const,
    page: 0,
  };

  await queryClient.prefetchQuery({
    queryKey: ["articles", defaultValues],
    queryFn: () => articles(defaultValues),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      commonLayout: true,
      commonSort: "인기",
    },
  };
};

export default function Popular({
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { query } = router;

  const searchType = "POPULAR";
  const category = useRecoilValue(categoryState);

  const isLogin = useRecoilValue(isLoginState);
  const [requestLoginPop, setRequestLoginPop] = useState<boolean>(false);

  // NOTE 글 목록 관련 hooks
  const {
    articlesData: { totalPages, pageNumber, contents, size },
    mutateArticle,
  } = useArticles({
    searchType,
    category,
    page: Number(query.page ?? 0),
  });

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  // NOTE 찜하기 버튼 클릭
  const onClickFavBtn = ({ articleId, interest }: { articleId: number; interest: boolean }) => {
    if (isLogin) {
      const index = contents.findIndex((content) => content.articleInfo.articleId === articleId);

      mutateArticle({ index, articleId, bookmarking: !interest });
    } else {
      setRequestLoginPop(true);
    }
  };

  // NOTE 페이지 변경 함수
  const onChangePage = (pageIndex: number) =>
    pageIndex === 0 ? router.push(router.pathname) : router.push({ query: { page: pageIndex } });
  console.log("contents", contents);
  return (
    <>
      {/* TODO: 여기 수정중 */}
      {/* <HydrationBoundary state={dehydratedState}> */}
      <main className={styles.popular}>
        <section className={styles.postSec}>
          <ul className={styles.postList} data-cy="postList">
            {contents?.map(
              (
                {
                  boardInfo,
                  userInfo: { nickname },
                  articleInfo: {
                    articleId,
                    read,
                    title,
                    // 댓글 수
                    commentNum,
                    createdAt,
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
                },
                idx,
              ) => (
                <li key={articleId} onClick={() => router.push(`/post/${articleId}`)}>
                  <div className={styles.leftArea}>
                    <div className={styles.rankCont}>
                      <h2 className={styles.rank}>{pageNumber * size + (idx + 1)}</h2>
                    </div>

                    <div className={`${styles.infoCont} ${read ? styles.read : ""}`}>
                      <div className={styles.titleBar}>
                        <h2 className={`${styles.title}`}>{title}</h2>
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
                          ・{nickname}・{moment(createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className={`${styles.thumbnailImgBox} ${read ? styles.read : ""}`}>
                      {thumbnail && (
                        <Image
                          src={thumbnail}
                          loader
                          priority
                          width={120}
                          height={82}
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      )}
                    </div>
                  </div>

                  <article className={styles.rightArea}>
                    {price ? (
                      <div
                        className={`${styles.priceCont} ${getDiffStyle(
                          changeRate || 0,
                        )} ${read ? styles.read : ""}`}
                      >
                        <div className={styles.diffBox}>
                          <p>
                            {`${(changeRate || 0) > 0 ? "+" : ""}${
                              changeRate || 0
                            }% (${changeAmount || 0})`}
                          </p>
                        </div>

                        <h1 className={styles.price}>{`${new Intl.NumberFormat().format(
                          price || 0,
                        )} P`}</h1>
                      </div>
                    ) : (
                      <div className={`${styles.notListedCont} ${read ? styles.read : ""}`}>
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
                        e.stopPropagation();
                        onClickFavBtn({ articleId, interest });
                      }}
                    >
                      {interest === true ? <HeartRedO /> : <HeartGrey />}
                    </button>
                  </article>
                </li>
              ),
            )}
          </ul>

          <PageNav totalPages={totalPages} currentPage={pageNumber} onChangePage={onChangePage} />
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
      {/* </HydrationBoundary> */}
    </>
  );
}
