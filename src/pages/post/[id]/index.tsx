import dynamic from "next/dynamic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  fetchPost,
  updateDislikePost,
  updateLikePost,
} from ".src/api/post/post";
import Image from "next/image";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import "moment/locale/ko";

import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./postScreen.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Gold from ".assets/icons/tier/Gold.svg";
import NewSky from ".assets/icons/NewSky.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import Eye from ".assets/icons/Eye.svg";
// import ThumbDnGrey from ".assets/icons/ThumbDnGrey.svg";
// import ThumbDnBlue from ".assets/icons/ThumbDnBlue.svg";
import NoticeCircleGrey from ".assets/icons/NoticeCircleGrey.svg";
import Message from ".assets/icons/Message.svg";
import UsePost from ".src/hooks/post/usePost";
import Reply from ".src/components/post/reply";
import PopupBg from ".src/components/common/popupBg";
import PostVerPopup from ".src/components/post/postVerPopup";
import PostImgPopup from ".src/components/post/postImgPopup";
import PostMorePopup from ".src/components/post/postMorePopup";
import ReportPostPopup from ".src/components/post/reportPostPopup";
import ReportUserPopup from ".src/components/post/reportUserPopup";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
// import BuyPostPopup from ".src/components/post/buyPostPopup";
import CompPayPopup from ".src/components/post/compPayPopup";
import { useRecoilValue } from "recoil";
import { isLoginState } from ".src/recoil";
import { currentUserInfo, hideAuthorsPosts } from ".src/api/users/users";
// import { userArticles } from ".src/api/articles/articles";
import { IPostDetailRes } from ".src/api/interface/post";
import ImageComp from ".src/components/Image";
import { articlesByUser } from ".src/api/articles/articles";

export default function Post() {
  const hook = UsePost();
  const router = useRouter();
  const { id: articleId } = router.query as { id: string };

  const isLogin = useRecoilValue(isLoginState);

  // NOTE 좋아요/싫어요 수정 불가 팝업 오픈 여부
  const [oneMinOver, setOneMinOver] = useState<boolean>(false);

  // NOTE tanstack qurey 현재 페이지 공통 키
  const queryKey = ["post", { articleId }];
  const queryClient = useQueryClient();

  // NOTE 현재 로그인한 유저 정보
  const { data: currentUserData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUserInfo,
    enabled: isLogin,
    gcTime: Infinity,
  });

  // NOTE URL 복사 완료 팝업 오픈 여부
  const [copied, setCopied] = useState<boolean>(false);

  // NOTE 글 상세 정보 조회
  const { data: postData } = useQuery({
    queryKey,
    queryFn: () => fetchPost(articleId),
    select: (res) => res?.data.data,
    enabled: !!articleId,
  });

  const userId = postData?.userInfo.userId;

  type LikeProps = {
    isTrue: boolean;
    type: "like" | "dislike";
  };
  // NOTE 좋아요/싫어요 - 등록/해제
  const { mutate: mutateSetValue } = useMutation({
    mutationFn: async ({ isTrue, type }: LikeProps) =>
      type === "like"
        ? await updateLikePost({
            articleId,
            isLike: isTrue,
          })
        : await updateDislikePost({
            articleId,
            isDislike: isTrue,
          }),

    onSuccess: (_, { type, isTrue }) =>
      queryClient.setQueryData<IPostDetailRes>(queryKey, (post) => {
        if (post != null) {
          const { priceInfo } = post.data.data;

          if (type === "like") {
            priceInfo.isLike = isTrue;
            isTrue ? (priceInfo.likeNum += 1) : (priceInfo.likeNum -= 1);
          } else {
            priceInfo.isDislike = isTrue;
            isTrue ? (priceInfo.dislikeNum += 1) : (priceInfo.dislikeNum -= 1);
          }
        }

        return post;
      }),

    onError: (error) => {
      error?.message.includes("minutes") && setOneMinOver(true);
    },
  });

  // NOTE 유저의 다른 글 조회
  const {
    data: articlesByUserSortByPrice,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["articles", { userId, sortBy: "PRICE" }],
    queryFn: () => articlesByUser({ userId }),
    enabled: !!userId,
  });
  const { data: articlesByUserSortByLatest } = useQuery({
    queryKey: ["articles", { userId, sortBy: "LATEST" }],
    queryFn: () => articlesByUser({ userId, sortBy: "LATEST" }),
    enabled: !!userId && isFetched && isError,
  });
  const articleListByUser = useMemo(
    () =>
      (articlesByUserSortByPrice ?? articlesByUserSortByLatest ?? []).slice(2),
    [articlesByUserSortByLatest, articlesByUserSortByPrice]
  );

  // NOTE 유저프로필 클릭 시 유저상세페이지로 연결
  const onMoveUserPage = () => {
    router.push({
      pathname: `/seller/${userId}`,
      query: { userId },
    });
  };

  // NOTE 좋아요/싫어요 클릭
  const onClickSetValue = useCallback(
    ({ type }: { type: "like" | "dislike" }) => {
      if (!isLogin) router.push("/auth/signin");
      else {
        const { isLike, isDislike } = postData!.priceInfo;

        if (!isLike && !isDislike)
          return mutateSetValue({ type, isTrue: true });
        else if (type === "like" && isDislike)
          return mutateSetValue({ type: "dislike", isTrue: false });
        else if (type === "dislike" && isLike)
          return mutateSetValue({ type: "like", isTrue: false });

        return mutateSetValue({ type, isTrue: false });
      }
    },
    [isLogin, mutateSetValue, postData, router]
  );

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  // NOTE '구매하기' 클릭
  const onClickBuy = () => {
    if (!isLogin) router.push("/auth/signin");
    else hook.setBuyPopup(true);
  };

  // NOTE URL 복사 클릭
  const urlCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  // NOTE 현재 글 작성자의 모든 글 숨기기
  const { mutate: mutateHidePosts } = useMutation({
    mutationFn: hideAuthorsPosts,
    onSuccess: hook.onSuccessHideUserPost,
    onError: (error) => {
      //TODO - 에러처리
    },
  });

  return (
    <>
      <CommonHeader />

      <main className={styles.postScreen}>
        <section className={styles.contSec}>
          <article className={styles.topBar}>
            <div className={styles.verArea}>
              <div className={styles.leftCont}>
                <h2 className={styles.category}>
                  {postData?.boardInfo.description}
                </h2>
                {!postData?.articleInfo.isListed && (
                  <>
                    <hr />

                    <div className={styles.verCont}>
                      <div className={styles.verBox}>
                        {/* 안되어있음 */}
                        <NewSky />
                        {/* 안되어있음 */}
                        <p>Ver.9</p>
                      </div>
                      {/* 안되어있음 */}
                      <p className={styles.time}>23.04.05</p>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.rightCont}>
                {!postData?.articleInfo.isListed && (
                  <button
                    className={styles.otherVerBtn}
                    onClick={() => hook.setPostVerPopup(true)}
                  >
                    <p>다른버전 보러가기</p>

                    <ChevronRt />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.titleArea}>
              <h1 className={styles.title}>{postData?.articleInfo.title}</h1>

              <div className={styles.utilBar}>
                <div className={styles.leftCont}>
                  <div className={`${styles.creatorBox} ${styles.contBox}`}>
                    <Gold />

                    <p onClick={onMoveUserPage} className={styles.cursor}>
                      {postData?.userInfo.nickname}
                    </p>
                  </div>

                  {!postData?.articleInfo.isListed ? (
                    <div className={`${styles.creatorBox} ${styles.contBox}`}>
                      <Eye />

                      <p>
                        {new Intl.NumberFormat().format(
                          postData?.articleInfo.totalViewNum || 0
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className={`${styles.creatorBox} ${styles.contBox}`}>
                      <p>
                        작성일{" "}
                        {moment(
                          new Date(postData?.articleInfo.updatedAt || "")
                        ).format("YYYY.MM.DD")}
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.rightCont}>
                  {!postData?.articleInfo.isListed && (
                    <>
                      <button className={styles.urlCopyBtn} onClick={urlCopy}>
                        URL 복사
                      </button>

                      <div className={styles.btnBox}>
                        {isLogin ? (
                          <button
                            className={styles.moreBtn}
                            onClick={() => hook.setMorePopup(true)}
                          >
                            <Dot3 />
                          </button>
                        ) : null}

                        {hook.morePopup && (
                          <>
                            <PostMorePopup UsePost={hook} />
                            <PopupBg off={() => hook.setMorePopup(false)} />
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* NOTE 비상장글일 때 */}
          {!postData?.articleInfo.isListed ? (
            <>
              <article className={styles.contArea}>
                <ReactQuill
                  readOnly
                  value={postData?.articleInfo.content}
                  modules={{ toolbar: false }}
                />
              </article>

              <article className={styles.likeArea}>
                {/* TODO 상장글에 적용될 코드 */}
                {/* <div
                  className={`${postData?.priceInfo.isLike ? styles.up : ""} ${
                    postData?.priceInfo.isDislike ? styles.dn : ""
                  } ${styles.innerCont}`}
                >
                  <button
                    className={styles.likeBtn}
                    onClick={() => onClickSetValue({ type: "like" })}
                  >
                    {postData?.priceInfo.isLike ? (
                      <ThumbUpRed />
                    ) : (
                      <ThumbUpGrey />
                    )}
                    <p>+1P</p>
                  </button>

                  <div className={styles.currentBox}>
                    <p>현재가</p>
                    <h2
                      className={styles.price}
                    >{`${new Intl.NumberFormat().format(
                      Number(postData?.priceInfo.price)
                    )}P`}</h2>
                    <p className={styles.percent}>
                      {postData?.priceInfo.changeRate || 0}%
                    </p>
                  </div>

                  <button
                    className={styles.likeBtn}
                    onClick={() => onClickSetValue({ type: "dislike" })}
                  >
                    {postData?.priceInfo.isDislike ? (
                      <ThumbDnBlue />
                    ) : (
                      <ThumbDnGrey />
                    )}
                    <p>-1P</p>
                  </button>
                </div> */}

                <div
                  className={`${
                    postData?.priceInfo.isLike ? styles.like : ""
                  } ${styles.innerCont} ${styles.notListed}`}
                  onClick={() => onClickSetValue({ type: "like" })}
                >
                  <ImageComp
                    src={
                      postData?.priceInfo.isLike
                        ? "/assets/icons/ThumbUpRed.svg"
                        : "/assets/icons/ThumbUpGrey.svg"
                    }
                    width={36}
                    height={36}
                    alt=""
                  />

                  <div
                    className={`${styles.currentBox} ${
                      postData?.priceInfo.isLike ? styles.like : ""
                    }`}
                  >
                    <p
                      className={`${
                        postData?.priceInfo.isLike ? styles.like : ""
                      }`}
                    >
                      좋아요
                    </p>
                    <h2
                      className={`${styles.price} ${
                        postData?.priceInfo.isLike ? styles.like : ""
                      }`}
                    >
                      {postData?.priceInfo.likeNum}
                    </h2>
                  </div>
                </div>
              </article>

              <article className={styles.replyArea}>
                <ul className={styles.tagList}>
                  {(postData?.tagList || []).map(
                    (v: { tagName: string }, i: number) => (
                      <li key={i}>{v.tagName}</li>
                    )
                  )}
                </ul>

                <div className={styles.inputCont}>
                  <div className={styles.countBar}>
                    <Message />

                    <p className={styles.key}>댓글</p>
                    <p className={styles.value}>
                      {new Intl.NumberFormat().format(9999)}
                    </p>
                  </div>

                  {isLogin ? (
                    <div className={styles.inputBox}>
                      <textarea
                        value={hook.reply}
                        onChange={(e) => hook.setReply(e.target.value)}
                        placeholder="댓글을 입력해주세요"
                      />

                      <button
                        className={styles.enrollBtn}
                        onClick={() => hook.setReply("")}
                      >
                        입력
                      </button>
                    </div>
                  ) : null}

                  <ul className={styles.replyList}>
                    {hook.replyList.map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />

                        {v.nestedReply?.map((detV, detI) => (
                          <Reply key={detI} data={detV} nested />
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </>
          ) : (
            // NOTE 상장글일 때
            <>
              <article
                className={`${styles.contArea} ${true ? "" : styles.limited}`}
              >
                <div className={styles.overlayBox}>
                  <button
                    className={`${styles.favBtn} ${
                      hook.isLike === true ? styles.on : ""
                    }`}
                    onClick={hook.onClickFavBtn}
                    data-testid={
                      hook.isLike === true ? "thumbRed" : "thumbGrey"
                    }
                  >
                    {hook.isLike === true ? <HeartRedO /> : <HeartGrey />}

                    <p>찜하기</p>
                  </button>

                  <p className={styles.plzBuy}>전체글을 보려면 구매해주세요.</p>
                </div>

                <p>
                  {`최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요`}
                </p>
              </article>

              <article className={styles.replyArea}>
                <div className={styles.inputCont}>
                  <div className={styles.countBar}>
                    <Message />

                    <p className={styles.key}>대표댓글</p>
                  </div>

                  <ul className={styles.replyList}>
                    {hook.replyList.slice(0, 3).map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </>
          )}
        </section>

        <aside>
          {/* NOTE 비상장글일 때 */}
          {!postData?.articleInfo.isListed ? (
            <>
              <article className={styles.creatorArea}>
                <div className={styles.profImgBox} onClick={onMoveUserPage}>
                  <Image
                    width={48}
                    height={48}
                    src={postData?.userInfo.image || DefaultProfImg.src}
                    alt=""
                  />
                </div>

                <div className={styles.nicknameBar} onClick={onMoveUserPage}>
                  <h1 className={styles.nickname}>
                    {postData?.userInfo.nickname}
                  </h1>
                  <Gold />
                </div>

                <p className={styles.profMsg}>
                  {postData?.userInfo.description}
                </p>
              </article>

              {!!articleListByUser.length && (
                <article
                  className={`${styles.otherPostArea} ${styles.postListArea}`}
                >
                  <p className={styles.areaTitle}>
                    {postData?.userInfo.nickname}님의 다른 글
                  </p>

                  <ul className={styles.postList}>
                    {articleListByUser.map(
                      (
                        {
                          boardInfo: { category },
                          articleInfo: { updatedAt, title, thumbnail, listed },
                          priceInfo: {
                            price,
                            changeRate,
                            changeAmount,
                            likeNum,
                          },
                        },
                        i
                      ) => (
                        <li key={i}>
                          <div className={styles.topBar}>
                            <p>
                              <strong className={styles.category}>
                                {category}
                              </strong>
                              ・{moment(updatedAt).fromNow()}
                            </p>
                          </div>

                          <div className={styles.contBar}>
                            <div className={styles.leftCont}>
                              <p className={styles.title}>{title}</p>

                              <div className={styles.thumbnailBox}>
                                {thumbnail && (
                                  <ImageComp
                                    src={thumbnail}
                                    loader
                                    priority
                                    width={40}
                                    height={40}
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>

                            {listed ? (
                              <div
                                className={`${styles.rightCont} ${getDiffStyle(
                                  changeRate || 0
                                )}`}
                              >
                                <p className={styles.diff}>
                                  {`${(changeRate || 0) > 0 ? "+" : ""}${
                                    changeRate || 0
                                  }% (${changeAmount || 0})`}
                                </p>

                                <p
                                  className={styles.price}
                                >{`${new Intl.NumberFormat().format(
                                  price || 0
                                )} 원`}</p>
                              </div>
                            ) : (
                              <div
                                className={`${styles.rightCont} ${styles.notListed}`}
                              >
                                <p
                                  className={`${styles.rightCont} ${styles.notListed} ${styles.like}`}
                                >{`좋아요 ${likeNum || 0}개`}</p>
                                <p>비상장</p>
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </article>
              )}

              <article
                className={`${styles.categoryPopularPostList} ${styles.postListArea}`}
              >
                <p className={styles.areaTitle}>
                  {postData?.boardInfo.description}의 인기글
                </p>

                <ul className={styles.postList}>
                  {hook.otherPostList.map((v, i) => (
                    <li key={i}>
                      {/* <div className={styles.topBar}>
                        <p>
                          <strong className={styles.category}>
                            {v.category}
                          </strong>
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
                          >{`${new Intl.NumberFormat().format(
                            v.point || 0
                          )} 원`}</p>
                        </div>
                      </div> */}
                    </li>
                  ))}
                </ul>
              </article>
            </>
          ) : (
            // NOTE 상장글일 때
            <article className={styles.buyArea}>
              <div className={styles.viewCont}>
                <strong className={styles.icon}>👀</strong>
                <br />
                {postData?.articleInfo.totalViewNum}명이 이 글을 봤어요!
              </div>

              <div className={styles.contCont}>
                <div className={styles.priceCont}>
                  <div className={`${styles.diffBox} ${getDiffStyle(1 || 0)}`}>
                    <p>+{postData?.priceInfo.changeRate || 0}% (63)</p>
                  </div>

                  <div className={`${styles.priceBox} ${getDiffStyle(1 || 0)}`}>
                    <p className={styles.key}>현재가</p>
                    <p className={styles.value}>
                      {Intl.NumberFormat().format(12000)} P
                    </p>
                  </div>

                  <div className={styles.noticeBox}>
                    <NoticeCircleGrey />

                    <p>실시간으로 가격이 변동될 수 있습니다</p>
                  </div>
                </div>

                <button className={styles.buyBtn} onClick={onClickBuy}>
                  구매하기
                </button>
              </div>
            </article>
          )}
        </aside>
      </main>

      <CommonFooter />

      {oneMinOver && (
        <>
          <ErrorMsgPopup
            msg="평가의 수정은 1분 이내에만 가능합니다"
            confirmFunc={() => setOneMinOver(false)}
          />
          <PopupBg bg off={() => setOneMinOver(false)} />
        </>
      )}

      {hook.postVerPopup && (
        <>
          <PostVerPopup off={() => hook.setPostVerPopup(false)} />
          <PopupBg bg off={() => hook.setPostVerPopup(false)} />
        </>
      )}

      {hook.imgPopup && (
        <>
          <PostImgPopup usePostHook={hook} />
          <PopupBg bg off={() => {}} />
        </>
      )}

      {hook.reportPostPopup && (
        <>
          <ReportPostPopup
            off={() => hook.setReportPostPopup(false)}
            confirmFunc={hook.onSuccessReportPost}
          />
          <PopupBg bg off={() => hook.setReportPostPopup(false)} />
        </>
      )}

      {hook.reportUserPopup && (
        <>
          <ReportUserPopup
            off={() => hook.setReportUserPopup(false)}
            confirmFunc={hook.onSuccessReportUser}
          />
          <PopupBg bg off={() => hook.setReportUserPopup(false)} />
        </>
      )}

      {userId && currentUserData && hook.hideUserPostPopup && (
        <>
          <ConfirmPopup
            title="이 사용자의 글을 숨기시겠어요?"
            content={`이미 구매한 글을 제외하고 ${postData?.userInfo.nickname}님의 게시글을 더는 보이지 않아요.`}
            confirmFunc={() =>
              mutateHidePosts({ author: userId, userId: currentUserData.id })
            }
            cancelFunc={() => hook.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => hook.setHideUserPostPopup(false)} />
        </>
      )}

      {hook.compReportPopup && (
        <>
          <ErrorMsgPopup
            msg="신고가 접수되었습니다."
            confirmFunc={() => hook.setCompReportPopup(false)}
          />
          <PopupBg bg off={() => hook.setCompReportPopup(false)} />
        </>
      )}

      {hook.compHideUserPostPopup && (
        <>
          <ErrorMsgPopup
            msg={
              <>
                사용자 글의 숨김처리를
                <br /> 완료하였습니다.
              </>
            }
            confirmFunc={() => {
              hook.setCompHideUserPostPopup(false);
              router.replace("/");
            }}
          />
          <PopupBg bg off={() => hook.setCompHideUserPostPopup(false)} />
        </>
      )}

      {hook.buyPopup && (
        <>
          {/* <BuyPostPopup usePost={hook} /> */}
          <PopupBg bg off={() => hook.setBuyPopup(false)} />
        </>
      )}

      {hook.compPayPopup && (
        <>
          <CompPayPopup
            usePost={hook}
            off={() => hook.setCompPayPopup(false)}
          />
          <PopupBg bg off={() => hook.setCompPayPopup(false)} />
        </>
      )}

      {copied && (
        <>
          <ErrorMsgPopup
            msg="URL이 복사되었습니다. "
            confirmFunc={() => setCopied(false)}
          />
          <PopupBg bg off={() => setCopied(false)} />
        </>
      )}
    </>
  );
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const reactQuill = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );

    return reactQuill;
  },
  {
    ssr: false,
  }
);
