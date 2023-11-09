import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import moment from "moment";
import "moment/locale/ko";

// import UsePopular from ".src/hooks/posts/usePopular";
import { articles } from ".src/api/articles/articles";
import { categoryState, isLoginState } from ".src/recoil";

import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import Image from ".src/components/Image";

// import PolygonUpRedO from ".assets/icons/PolygonUpRedO.svg";
// import PolygonDnBlueO from ".assets/icons/PolygonDnBlueO.svg";
// import HorizonBarGrey from ".assets/icons/HorizonBarGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import styles from "./popular.module.scss";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  const defaultValues = {
    category: "ALL",
    sortBy: "POPULAR" as const,
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
  // FIXME - API 연동끝나면 관련 코드 일괄 정리
  // const usePopular = UsePopular();

  const router = useRouter();

  const sortBy = "POPULAR";
  const category = useRecoilValue(categoryState);
  const [page, setPage] = useState<number>(0);

  const isLogin = useRecoilValue(isLoginState);
  const [requestLoginPop, setRequestLoginPop] = useState<boolean>(false);

  const { data: articleList } = useQuery({
    queryKey: ["articles", { category, sortBy, page }],
    queryFn: () => articles({ category, sortBy, page }),
  });

  const [imageLoadError, setImageLoadError] = useState<Set<number>>(new Set());

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  // function getRankDiffIcon(diff: number) {
  //   if (diff > 0) return <PolygonUpRedO />;
  //   else if (diff < 0) return <PolygonDnBlueO />;
  //   else return <HorizonBarGrey />;
  // }

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
    <HydrationBoundary state={dehydratedState}>
      <main className={styles.popular}>
        <section className={styles.postSec}>
          <ul className={styles.postList} data-cy="postList">
            {articleList?.contents?.map(
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
                },
                idx
              ) => (
                <li
                  key={articleId}
                  onClick={() => router.push(`/post/${articleId}`)}
                >
                  <div className={styles.leftArea}>
                    <div className={styles.rankCont}>
                      <h2 className={styles.rank}>{idx + 1}</h2>

                      {/* FIXME 응답 API에 랭킹 정보 없음 추후 기능 추가되면 수정 필요 */}
                      {/* <div
                        className={`${styles.diffBox} ${getDiffStyle(
                          v.rankDiff || 0
                        )}`}
                      >
                        {getRankDiffIcon(v.rankDiff || 0)}

                        <p>{Math.abs(v.rankDiff || 0)}</p>
                      </div> */}
                    </div>

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

                          <p>{category}</p>
                        </div>

                        <p className={styles.creator}>
                          ・{nickname}・{moment(updatedAt).fromNow()}
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
                      // onClick={(e) => usePopular.onClickFavBtn(e, i)}
                      onClick={(e) => onClickFavBtn(e)}
                    >
                      {interest === true ? <HeartRedO /> : <HeartGrey />}
                    </button>
                  </article>
                </li>
              )
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
    </HydrationBoundary>
  );
}
