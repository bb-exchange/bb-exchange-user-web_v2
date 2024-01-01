import dynamic from "next/dynamic";
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  postById,
  updateDislikePost,
  updateLikePost,
} from ".src/api/post/post";
import Image from "next/image";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "moment/locale/ko";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./postScreen.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Gold from ".assets/icons/tier/Gold.svg";
import Silver from ".assets/icons/tier/Silver.svg";
import NewSky from ".assets/icons/NewSky.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import Eye from ".assets/icons/Eye.svg";
import ThumbDnGrey from ".assets/icons/ThumbDnGrey.svg";
import ThumbDnBlue from ".assets/icons/ThumbDnBlue.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
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
import ImageComp from ".src/components/Image";
import { articles } from ".src/api/articles/articles";
import { useArticlesByUser } from ".src/hooks/posts/useArticlesByUser";
import {
  CommentSortByType,
  Comments,
  commentsByArticleId,
  createComment,
  updateLikeComment,
} from ".src/api/comments";
import { InView } from "react-intersection-observer";
import { ArticleData } from ".src/api/interface/articles";
import { PostData } from ".src/api/interface";
import Head from "next/head";

export default function Post() {
  const hook = UsePost();
  const router = useRouter();
  const { id: articleId } = router.query as { id: string };

  const isLogin = useRecoilValue(isLoginState);

  // NOTE 좋아요/싫어요 수정 불가 팝업 오픈 여부
  const [oneMinOver, setOneMinOver] = useState<boolean>(false);

  // NOTE tanstack qurey 현재 페이지 공통 키
  const queryKey = [postById.name, { articleId }];
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [StarterKit],
  });

  // NOTE 현재 로그인한 유저 정보
  const { data: currentUserData } = useQuery({
    queryKey: [currentUserInfo.name],
    queryFn: currentUserInfo,
    enabled: isLogin,
    gcTime: Infinity,
  });

  // NOTE URL 복사 완료 팝업 오픈 여부
  const [copied, setCopied] = useState<boolean>(false);

  // NOTE 글 상세 정보 조회
  const { data: postData, status: postDataStatus } = useQuery({
    queryKey,
    queryFn: () => postById(articleId),
    enabled: !!articleId,
  });

  // json[0]넣으면 보이는게 맞는지 확인 필요함
  useEffect(() => {
    if (editor && postData && Object.keys(postData).length) {
      const json = JSON.parse(postData?.articleInfo?.content);
      // console.log("?", json[0]);
      editor?.commands.setContent(json[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  const userId = postData?.userInfo.userId;

  // NOTE 좋아요/싫어요 - 등록/해제
  const { mutate: mutateSetValue } = useMutation({
    mutationFn: async ({
      isTrue,
      type,
    }: {
      isTrue: boolean;
      type: "like" | "dislike";
    }) =>
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
      queryClient.setQueryData<PostData>(queryKey, (post) => {
        if (post != null) {
          const { priceInfo } = post;

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

    onError: (error) =>
      error?.message.includes("minutes") && setOneMinOver(true),
  });

  // NOTE 유저의 다른 글 조회
  const articlesByUser = useArticlesByUser({ userId, articleId });

  // NOTE 현재 카테고리의 인기글 조회
  const { data: popularArticles } = useQuery({
    queryKey: [articles.name, { category: postData?.boardInfo.category }],
    enabled: !!(postData?.boardInfo.category != null),
    queryFn: () =>
      articles({
        category: postData!.boardInfo.category,
        searchType: "POPULAR",
        page: 0,
      }),
    select: ({ contents }) => {
      const list = contents.filter(
        ({ articleInfo: { articleId: id } }) => id !== Number(articleId)
      );

      return list.length > 3 ? list.slice(0, 3) : list;
    },
  });

  // NOTE 댓글 목록 정렬 기준
  const [commentSortBy, setCommentSortBy] =
    useState<CommentSortByType>("POPULAR");
  // NOTE 댓글 목록 조회
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery({
    enabled: !!articleId,
    queryKey: [commentsByArticleId.name, { sortBy: commentSortBy }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      commentsByArticleId({
        articleId,
        page: pageParam,
        sortBy: commentSortBy,
      }),
    getNextPageParam: ({ hasNext, pageNumber }) =>
      hasNext ? pageNumber + 1 : null,
    placeholderData: keepPreviousData,
  });

  // NOTE 대댓글 입력 시 정보
  const commentMention = useRef<string | null>(null);
  const parentCommentId = useRef<number | null>(null);

  const [commentContent, setCommentContent] = useState<string>("");

  // NOTE 댓글 추가
  const { mutate: mutateComment } = useMutation({
    mutationFn: () =>
      createComment({
        articleId,
        parentCommentId: parentCommentId.current,
        content: commentContent,
      }),
    onSuccess: () => {
      if (parentCommentId.current == null) {
        setCommentSortBy("LATEST");
      } else {
        commentMention.current = null;
        parentCommentId.current = null;

        refetchComments();
      }

      setCommentContent("");
    },
  });

  // NOTE 댓글 입력
  const onChangeComment = (value: string) => {
    if (
      commentMention.current != null &&
      !value.startsWith(commentMention.current)
    ) {
      commentMention.current = null;
      parentCommentId.current = null;
    }

    setCommentContent(value);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // NOTE 대댓글 달기 버튼 클릭 시
  const onClickNestedComment = ({
    nickname,
    commentId,
  }: {
    nickname: string;
    commentId: number;
  }) => {
    const mention = `@${nickname} `;
    commentMention.current = mention;
    parentCommentId.current = commentId;
    setCommentContent(mention);

    textareaRef.current?.focus();
  };

  // NOTE 댓글 저장
  const onSubmit = useCallback(() => {
    if (!commentContent || commentContent == null) return;
    mutateComment();
  }, [commentContent, mutateComment]);

  // NOTE 댓글 좋아요 등록/해제
  const { mutate: mutateLikeComment } = useMutation({
    mutationFn: updateLikeComment,
    onSuccess: (_, { isLike, commentId }) =>
      queryClient.setQueryData<InfiniteData<Comments>>(
        [commentsByArticleId.name, { sortBy: commentSortBy }],
        (data) => {
          if (data != null) {
            data.pages = data.pages.map((page) => ({
              ...page,
              contents: page.contents.map((content) =>
                content.commentId === commentId
                  ? {
                      ...content,
                      isLike,
                      likeCounts: isLike
                        ? (content.likeCounts += 1)
                        : (content.likeCounts -= 1),
                    }
                  : content
              ),
            }));
          }
          return data;
        }
      ),
  });

  // NOTE 댓글 좋아요 등록/해제 함수
  const onClickLikeComment = useCallback(
    (props: { isLike: boolean; commentId: number }) => mutateLikeComment(props),
    [mutateLikeComment]
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
      else if (!postData?.priceInfo) return;
      else {
        const { isLike, isDislike } = postData.priceInfo;

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
    const value = window.location.href.replace("post", "link");
    navigator.clipboard.writeText(value);
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

  // NOTE 다른 글로 이동하는 함수
  const onClickMoveToPost = (articleId: number) =>
    router.push(`/post/${articleId}`);

  // NOTE 비상장글이거나 구매한 글인지 여부
  const isOwnership = useMemo(
    () =>
      postData
        ? !!(!postData.articleInfo.isListed || postData.articleInfo.isPurchased)
        : false,
    [postData]
  );

  // console.log("postData", JSON.parse(postData?.articleInfo?.content));

  return (
    <>
      <Head>
        <title>
          비법거래소
          {postData?.articleInfo.title && ` • ${postData?.articleInfo.title}`}
        </title>
      </Head>

      <CommonHeader />

      {postDataStatus === "pending" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "800px",
            paddingTop: "130px",
          }}
        >
          <ImageComp
            src={"/assets/icons/loading/threeDots.gif"}
            alt={"loading dots"}
            width={150}
            height={150}
          />
        </div>
      ) : (
        <main className={styles.postScreen}>
          <section className={styles.contSec}>
            {/* SECTION 타이틀 영역 */}
            {editor && <EditorContent editor={editor} height={"300px"} />}
            <article className={styles.topBar}>
              <div className={styles.verArea}>
                <div className={styles.leftCont}>
                  {/* NOTE 현재 글 카테고리 */}
                  <h2 className={styles.category}>
                    {postData?.boardInfo.description}
                  </h2>

                  {/* NOTE 비상장글 이거나 구매한 글일 때 */}
                  {isOwnership && (
                    <>
                      <hr />

                      {/* NOTE 현재 글 버전 */}
                      <div className={styles.verCont}>
                        <div className={styles.verBox}>
                          {/* REVIEW 벳지 출력 관련 정보 없음(최신글/베스트글 여부) */}
                          {/* <NewSky /> */}
                          <p>Ver.{postData?.articleInfo.version || 1}</p>
                        </div>
                        {/* 안되어있음 */}
                        <p className={styles.time}>
                          {moment(postData?.articleInfo.updatedAt).format(
                            "YY.MM.DD"
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* NOTE 글 히스토리(이전 버전) */}
                {/* NOTE 비상장글 이거나 구매한 글일 때 출력 */}
                {/* <div className={styles.rightCont}>
                  {isOwnership && (
                    <button
                      className={styles.otherVerBtn}
                      onClick={() => hook.setPostVerPopup(true)}
                    >
                      <p>다른버전 보러가기</p>

                      <ChevronRt />
                    </button>
                  )}
                </div> */}
              </div>

              <div className={styles.titleArea}>
                {/* NOTE 타이틀 */}
                <h1 className={styles.title}>{postData?.articleInfo.title}</h1>

                <div className={styles.utilBar}>
                  <div className={styles.leftCont}>
                    {/* NOTE 작성자 */}
                    <div className={`${styles.creatorBox} ${styles.contBox}`}>
                      <>
                        {!!(postData?.userInfo.gradeType === "MASTER") && (
                          <Gold />
                        )}
                        {!!(postData?.userInfo.gradeType === "SEMI") && (
                          <Silver />
                        )}
                      </>

                      <p onClick={onMoveUserPage} className={styles.cursor}>
                        {postData?.userInfo.nickname}
                      </p>
                    </div>

                    {isOwnership ? (
                      // NOTE 비상장글 이거나 구매한 글일 때 - 조회수
                      <div className={`${styles.creatorBox} ${styles.contBox}`}>
                        <Eye />

                        <p>
                          {new Intl.NumberFormat().format(
                            postData?.articleInfo.totalViewNum || 0
                          )}
                        </p>
                      </div>
                    ) : (
                      // NOTE 비구매 글일 때 - 작성일
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
                    <button className={styles.urlCopyBtn} onClick={urlCopy}>
                      URL 복사
                    </button>
                    {/* NOTE 로그인 && (비상장 || 구매한 글)인 유저만 볼 수 있는 더보기 메뉴 */}
                    {isOwnership && (
                      <div className={styles.btnBox}>
                        {isLogin && isOwnership && (
                          <button
                            className={styles.moreBtn}
                            onClick={() => hook.setMorePopup(true)}
                          >
                            <Dot3 />
                          </button>
                        )}

                        {hook.morePopup && (
                          <>
                            <PostMorePopup UsePost={hook} />
                            <PopupBg off={() => hook.setMorePopup(false)} />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
            {/* !SECTION */}

            {/* SECTION 글 내용 영역 */}
            {/* NOTE 비상장글 이거나 구매한 글일 때 */}
            {isOwnership ? (
              <>
                <article className={styles.contArea}>
                  <ReactQuill
                    readOnly
                    value={postData?.articleInfo.content}
                    modules={{ toolbar: false }}
                  />
                </article>

                {/* NOTE 좋아요 */}
                <article className={styles.likeArea}>
                  {!postData?.articleInfo.isListed ? (
                    // NOTE 비상장글일 때
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
                  ) : (
                    // NOTE 구매한글일 때
                    <div
                      className={`${
                        postData?.priceInfo.isLike ? styles.up : ""
                      } ${postData?.priceInfo.isDislike ? styles.dn : ""} ${
                        styles.innerCont
                      }`}
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
                    </div>
                  )}
                </article>

                {/* NOTE 태그 영역 */}
                <article className={styles.replyArea}>
                  <ul className={styles.tagList}>
                    {postData?.tagList.map(({ tagName, tagId }) => (
                      <li key={tagId}>{tagName}</li>
                    ))}
                  </ul>

                  {/* NOTE 비상장글/구매한글일 때 댓글 */}
                  <div className={styles.inputCont}>
                    <div className={styles.countBar}>
                      <Message />

                      <p className={styles.key}>댓글</p>
                      <p className={styles.value}>
                        {comments?.pages[0].totalElements ?? 0}
                      </p>
                    </div>

                    {/* NOTE 로그인한 유저에게만 댓글 입력창 출력 */}
                    {!!isLogin && (
                      <div className={styles.inputBox}>
                        <textarea
                          ref={(ref) => {
                            textareaRef.current = ref;
                            if (ref?.style) {
                              ref.style.minHeight = "54px";
                              ref.style.height = "auto";
                              ref.style.height = `${ref?.scrollHeight}px`;
                              ref.style.maxHeight = "200px";
                            }
                          }}
                          rows={1}
                          value={commentContent}
                          onChange={({ target: { value } }) =>
                            onChangeComment(value)
                          }
                          placeholder="댓글을 입력해주세요"
                        />

                        <button className={styles.enrollBtn} onClick={onSubmit}>
                          입력
                        </button>
                      </div>
                    )}

                    {/* NOTE 댓글 목록 */}
                    <ul className={styles.replyList}>
                      {comments?.pages.map((page) =>
                        page.contents.map((props) => (
                          <li key={props.commentId}>
                            <Reply
                              data={props}
                              nested={!!(props.parentCommentId != null)}
                              onClickNestedComment={onClickNestedComment}
                              onClickLikeComment={onClickLikeComment}
                            />
                          </li>
                        ))
                      )}
                      {!!comments?.pages[0].contents.length &&
                        (!isFetchingNextPage ? (
                          <InView
                            onChange={(inView) =>
                              inView && hasNextPage && fetchNextPage()
                            }
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ImageComp
                              src={"/assets/icons/loading/threeDots.gif"}
                              alt={"loading dots"}
                              width={70}
                              height={70}
                            />
                          </div>
                        ))}
                    </ul>
                  </div>
                </article>
              </>
            ) : (
              // NOTE 상장글이면서 비구매 글일 때
              <>
                <article className={`${styles.contArea} ${styles.limited}`}>
                  <div className={styles.overlayBox}>
                    <button
                      className={`${styles.favBtn} ${
                        !!postData?.priceInfo.isLike ? styles.on : ""
                      }`}
                      onClick={() => onClickSetValue({ type: "like" })}
                      data-testid={
                        !!postData?.priceInfo.isLike ? "thumbRed" : "thumbGrey"
                      }
                    >
                      {!!postData?.priceInfo.isLike ? (
                        <HeartRedO />
                      ) : (
                        <HeartGrey />
                      )}

                      <p>찜하기</p>
                    </button>

                    <p className={styles.plzBuy}>
                      전체글을 보려면 구매해주세요.
                    </p>
                  </div>

                  {/* FIXME 임시 */}
                  {postData?.articleInfo.content ? (
                    <article className={styles.contArea}>
                      <ReactQuill
                        readOnly
                        value={postData?.articleInfo.content}
                        modules={{ toolbar: false }}
                      />
                    </article>
                  ) : (
                    <p>
                      {`최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요`}
                    </p>
                  )}
                </article>

                {/* NOTE 비구매글일 때 댓글 */}
                <article className={styles.replyArea}>
                  <div className={styles.inputCont}>
                    <div className={styles.countBar}>
                      <Message />

                      <p className={styles.key}>대표댓글</p>
                    </div>

                    {/* FIXME 실 적용할 때 데이터 다시 확인 필요 */}
                    {/* <ul className={styles.replyList}>
                    {hook.replyList.slice(0, 3).map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />
                      </li>
                    ))}
                  </ul> */}
                  </div>
                </article>
              </>
            )}
          </section>
          {/* !SECTION */}

          {/* SECTION 우측 영역 */}
          <aside>
            {/* NOTE 비상장글 이거나 구매글일 때 */}
            {isOwnership ? (
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
                    <>
                      {!!(postData?.userInfo.gradeType === "MASTER") && (
                        <Gold />
                      )}
                      {!!(postData?.userInfo.gradeType === "SEMI") && (
                        <Silver />
                      )}
                    </>
                  </div>

                  <p className={styles.profMsg}>
                    {postData?.userInfo.description}
                  </p>
                </article>

                {/* NOTE 작성자의 다른 글 목록 */}
                {!!articlesByUser.length && (
                  <article
                    className={`${styles.otherPostArea} ${styles.postListArea}`}
                  >
                    <p className={styles.areaTitle}>
                      {postData?.userInfo.nickname}님의 다른 글
                    </p>

                    <ul className={styles.postList}>
                      {articlesByUser.map((props) => (
                        <ArticleItem
                          key={props.articleInfo.articleId}
                          onClickMoveToPost={onClickMoveToPost}
                          getDiffStyle={getDiffStyle}
                          {...props}
                        />
                      ))}
                    </ul>
                  </article>
                )}

                {/* NOTE 현재 카테고리 인기글 목록 */}
                <article
                  className={`${styles.categoryPopularPostList} ${styles.postListArea}`}
                >
                  <p className={styles.areaTitle}>
                    {postData?.boardInfo.description}의 인기글
                  </p>

                  <ul className={styles.postList}>
                    {popularArticles?.length ? (
                      popularArticles.map((props) => (
                        <ArticleItem
                          key={props.articleInfo.articleId}
                          onClickMoveToPost={onClickMoveToPost}
                          getDiffStyle={getDiffStyle}
                          {...props}
                        />
                      ))
                    ) : (
                      <div className={styles.emptyArea}>
                        <div>
                          <ImageComp
                            src="/assets/icons/Warn.svg"
                            width={48}
                            height={48}
                            alt=""
                          />
                          <p className={styles.emptyDesc}>인기글이 없습니다</p>
                          <button onClick={() => router.push("/popular")}>
                            <p>전체 인기글 보러가기</p>

                            <ImageComp
                              src="/assets/icons/BlackArrowRight.svg"
                              height={20}
                              width={20}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                </article>
              </>
            ) : (
              // NOTE 상장글이면서 비구매글일 때
              <article className={styles.buyArea}>
                <div className={styles.viewCont}>
                  <strong className={styles.icon}>👀</strong>
                  <br />
                  {postData?.articleInfo.totalViewNum || 0}명이 이 글을 봤어요!
                </div>

                <div className={styles.contCont}>
                  <div className={styles.priceCont}>
                    <div
                      className={`${styles.diffBox} ${getDiffStyle(1 || 0)}`}
                    >
                      <p>
                        +{postData?.priceInfo.changeRate || 0}% (
                        {postData?.priceInfo.changeAmount || 0})
                      </p>
                    </div>

                    <div
                      className={`${styles.priceBox} ${getDiffStyle(1 || 0)}`}
                    >
                      <p className={styles.key}>현재가</p>
                      <p className={styles.value}>
                        {Intl.NumberFormat().format(
                          postData?.priceInfo.price || 0
                        )}{" "}
                        P
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
          {/* !SECTION */}
        </main>
      )}

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

// NOTE 우측 영역 목록 아이템
const ArticleItem = ({
  boardInfo: { description },
  articleInfo: { updatedAt, title, thumbnail, listed, articleId },
  priceInfo: { price, changeRate, changeAmount, likeNum },
  onClickMoveToPost,
  getDiffStyle,
}: ArticleData & {
  onClickMoveToPost: (articleId: number) => void;
  getDiffStyle: (diff: number) => string | undefined;
}) => {
  return (
    <li>
      <div className={styles.topBar}>
        <p>
          <strong className={styles.category}>{description}</strong>・
          {moment(updatedAt).fromNow()}
        </p>
      </div>

      <div
        className={styles.contBar}
        onClick={() => onClickMoveToPost(articleId)}
      >
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
            className={`${styles.rightCont} ${getDiffStyle(changeRate || 0)}`}
          >
            <p className={styles.diff}>
              {`${(changeRate || 0) > 0 ? "+" : ""}${changeRate || 0}% (${
                changeAmount || 0
              })`}
            </p>

            <p className={styles.price}>{`${new Intl.NumberFormat().format(
              price || 0
            )} 원`}</p>
          </div>
        ) : (
          <div className={`${styles.rightCont} ${styles.notListed}`}>
            <p
              className={`${styles.rightCont} ${styles.notListed} ${styles.like}`}
            >{`좋아요 ${likeNum || 0}개`}</p>
            <p>비상장</p>
          </div>
        )}
      </div>
    </li>
  );
};
