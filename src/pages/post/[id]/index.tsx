import styles from "./postScreen.module.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Dot3 from ".assets/icons/Dot3.svg";
import Eye from ".assets/icons/Eye.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import Message from ".assets/icons/Message.svg";
import NoticeCircleGrey from ".assets/icons/NoticeCircleGrey.svg";
import ThumbDnBlue from ".assets/icons/ThumbDnBlue.svg";
import ThumbDnGrey from ".assets/icons/ThumbDnGrey.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
import Gold from ".assets/icons/tier/Gold.svg";
import Silver from ".assets/icons/tier/Silver.svg";
import { articles, updateArticleBookmark } from ".src/api/articles/articles";
import { CommentSortByType } from ".src/api/comments";
import { basicInstance } from ".src/api/instance";
import { PostData } from ".src/api/interface";
import { ArticleData } from ".src/api/interface/articles";
import { deletePost, postById, updateDislikePost, updateLikePost } from ".src/api/post/post";
import { currentUserInfo, hideAuthorsPosts } from ".src/api/users/users";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import PopupBg from ".src/components/common/popupBg";
import Image from ".src/components/Image";
import CompPayPopup from ".src/components/post/compPayPopup";
import PostDeleteConfirmPopup from ".src/components/post/PostDeleteConfirmPopup";
import PostEditConfirmPopup from ".src/components/post/postEditConfirmPopup";
import PostImgPopup from ".src/components/post/postImgPopup";
import PostMorePopup from ".src/components/post/postMorePopup";
import PostVerPopup from ".src/components/post/postVerPopup";
import Reply from ".src/components/post/reply";
import ReportPostPopup from ".src/components/post/reportPostPopup";
import ReportUserPopup from ".src/components/post/reportUserPopup";
import { useMakeEditor } from ".src/hooks/enroll/useMakeEditor";
import { useComments } from ".src/hooks/post/useComments";
import UsePost from ".src/hooks/post/usePost";
import { useArticlesByUser } from ".src/hooks/posts/useArticlesByUser";
import { isLoginState } from ".src/recoil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditorContent } from "@tiptap/react";
import classNames from "classnames";
import { deleteCookie } from "cookies-next";
import moment from "moment";
import { useRecoilValue } from "recoil";

import { isDailyEventSuccess } from "@api/event";

import { CommonPopup } from "@components/common/popup/CommonPopup";
import BuyPostPopup from "@components/post/buyPostPopup";
import { SubHeader } from "@components/post/SubHeader";

import useGetMyProfile from "@hooks/common/useGetProfile";

import { formatRate } from "@utils/format";

export const getServerSideProps: GetServerSideProps<{
  postData: PostData | undefined;
}> = async (context: GetServerSidePropsContext) => {
  const accessToken = context.req.cookies.accessToken;
  const refreshToken = context.req.cookies.refreshToken;

  if (accessToken) {
    basicInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    basicInstance.defaults.headers.common.refreshToken = refreshToken;
  }

  const articleId = context.query.id as string;

  try {
    const postData = await postById(articleId);

    return {
      props: {
        postData,
      },
    };
  } catch (e) {
    deleteCookie("accessToken", {
      path: "/",
      domain: context.req.headers.host,
    });
    deleteCookie("refreshToken", {
      path: "/",
      domain: context.req.headers.host,
    });

    basicInstance.defaults.headers.common.Authorization = "";
    basicInstance.defaults.headers.common.refreshToken = "";

    return {
      props: {
        postData: undefined,
      },
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
};

// NOTE 댓글 정렬 라벨
const commentSortByInfo: { [key in CommentSortByType]: string } = {
  LATEST: "최신순",
  POPULAR: "인기순",
};

export default function Post({
  postData: _postData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const hook = UsePost();
  const router = useRouter();
  const { id: articleId } = router.query as { id: string };

  const isLogin = useRecoilValue(isLoginState);
  const { profile } = useGetMyProfile();

  // NOTE 좋아요/싫어요 수정 불가 팝업 오픈 여부
  const [oneMinOver, setOneMinOver] = useState<boolean>(false);

  // NOTE tanstack qurey 현재 페이지 공통 키
  const queryKey = [postById.name, { articleId }];
  const queryClient = useQueryClient();

  // NOTE 현재 로그인한 유저 정보
  const { data: currentUserData } = useQuery({
    queryKey: [currentUserInfo.name],
    queryFn: currentUserInfo,
    enabled: isLogin,
    gcTime: Infinity,
  });

  // NOTE - 내 글 비공개 전환 팝업 오픈 여부
  const [openConfirmPrivate, setOpenConfirmPrivate] = useState<boolean>(false);

  // NOTE - 내 글 수정하기 확인 팝업 오픈 여부
  const [openConfirmEdit, setOpenConfirmEdit] = useState<boolean>(false);

  // NOTE - 내 글 삭제하기 확인 팝업 오픈 여부
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  // NOTE - 내 글 삭제 완료 팝업 오픈 여부
  const [openConfirmDeleteComplete, setOpenConfirmDeleteComplete] = useState<boolean>(false);

  // NOTE - 일일보상 지급완료 팝업 오픈 여부
  const [dailyEventPopupInfo, setDailyEventPopupInfo] = useState({
    isShow: false,
    title: "",
    subTitle: "",
  });

  // NOTE URL 복사 완료 팝업 오픈 여부
  const [copied, setCopied] = useState<boolean>(false);

  const { data: postData, refetch: refetchPostData } = useQuery({
    queryKey,
    queryFn: () => postById(articleId),
    initialData: _postData,
  });

  //NOTE - tiptap 게시글 출력
  const { editor } = useMakeEditor({ isEdit: false });
  useEffect(() => {
    if (editor && postData && Object.keys(postData).length) {
      const json = JSON.parse(postData?.articleInfo?.content);
      editor?.commands.setContent(json);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, postData]);

  const userId = postData?.userInfo.userId;

  // NOTE - 글 삭제 fetch 함수
  const { mutate: deleteThisPost } = useMutation({
    mutationFn: () => deletePost(articleId),
    onSuccess: () => setOpenConfirmDeleteComplete(true),
  });

  // NOTE - 현재 글 삭제
  const onConfirmDelete = () => deleteThisPost();

  // NOTE 좋아요/싫어요 - 등록/해제
  const { mutateAsync: mutateSetValue } = useMutation({
    mutationFn: async ({ isTrue, type }: { isTrue: boolean; type: "like" | "dislike" }) =>
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

    onError: (error) => error?.message.includes("minutes") && setOneMinOver(true),
  });

  // NOTE - 상장글 비구매 글 찜하기
  const { mutate: mutateBookmark } = useMutation({
    mutationFn: updateArticleBookmark,
    onSuccess: (_, { bookmarking }) =>
      queryClient.setQueryData<PostData>(queryKey, (post) => {
        if (post != null) {
          const { articleInfo } = post;
          articleInfo.interest = bookmarking;
        }
        return post;
      }),
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
        ({ articleInfo: { articleId: id } }) => id !== Number(articleId),
      );

      return list.length > 3 ? list.slice(0, 3) : list;
    },
  });

  // NOTE 댓글 목록 정렬 기준
  const [commentSortBy, setCommentSortBy] = useState<CommentSortByType>("POPULAR");

  // NOTE  댓글 정렬 팝업 오픈 여부
  const [showCommentSortByPopup, setShowCommentSortByPopup] = useState(false);

  const onClickSetCommentSortBy = (sortBy: CommentSortByType) => {
    setCommentSortBy(sortBy);
    setShowCommentSortByPopup(false);
  };

  const {
    // NOTE 댓글 목록 조회
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchComments,

    // NOTE 댓글 추가
    newComment,
    // NOTE 댓글 수정
    editComment,
    // NOTE 댓글 삭제
    removeComment,

    // NOTE 댓글 좋아요 등록/해제
    setLikeComment,
  } = useComments({ articleId, commentSortBy });

  // NOTE 입력창에 입력중인 댓글
  const [commentContent, setCommentContent] = useState<string>("");

  // NOTE 댓글 유효성 체크
  const isValidComment = useMemo(() => !!commentContent.trim(), [commentContent]);

  // NOTE 댓글 입력
  const onChangeComment = (value: string) => setCommentContent(value);

  // NOTE 댓글 저장
  const onSubmit = useCallback(async () => {
    if (!isValidComment) return;

    await newComment(
      {
        articleId,
        parentCommentId: null,
        content: commentContent,
      },
      {
        onSuccess: () => {
          setCommentSortBy("LATEST");
          setCommentContent("");
        },
        onError: (e: any) => {
          if (e.code === "CMT003") {
            return hook.setIsSpamPopupShow(true);
          }
        },
      },
    );

    // 일일보상 댓글 작성 완료여부 조회
    const { data } = await isDailyEventSuccess(profile?.userId, "ARTICLE_COMMENT");

    if (data.data.done) {
      setDailyEventPopupInfo((prev) => ({
        ...prev,
        title: `<span class='color-primary1'>${data.data.amount}원</span> 받았어요!`,
        subTitle: `비법글에 댓글 ${data.data.attainment}개 작성하기`,
        isShow: true,
      }));
    }
  }, [articleId, commentContent, hook, isValidComment, newComment, profile?.userId]);

  // NOTE 댓글 수정
  const onClickUpdateComment = useCallback(
    (props: { commentId: number; content: string }) => editComment(props),
    [editComment],
  );

  // NOTE 댓글 삭제
  const onClickDeleteComment = useCallback(
    (commentId: number) => removeComment(commentId),
    [removeComment],
  );

  // NOTE 대댓글 추가
  const onClickCreateComment = useCallback(
    (props: { parentCommentId: number; content: string }) => {
      newComment(
        { articleId, ...props },
        {
          onSuccess: async () => {
            await refetchComments();

            // 일일보상 댓글 작성 완료여부 조회
            const { data } = await isDailyEventSuccess(profile?.userId, "ARTICLE_COMMENT");

            if (data.data.done) {
              setDailyEventPopupInfo((prev) => ({
                ...prev,
                title: `<span class='color-primary1'>${data.data.amount}원</span> 받았어요!`,
                subTitle: `비법글에 댓글 ${data.data.attainment}개 작성하기`,
                isShow: true,
              }));
            }
          },
        },
      );
    },
    [articleId, newComment, profile?.userId, refetchComments],
  );

  // NOTE 댓글 좋아요 등록/해제
  const onClickLikeComment = useCallback(
    async (props: { isLike: boolean; commentId: number }) => {
      await setLikeComment(props);

      if (!props.isLike) return;

      // 일일보상 댓글 좋아요 완료여부 조회
      const { data } = await isDailyEventSuccess(profile?.userId, "COMMENT_LIKE");

      if (data.data.done) {
        setDailyEventPopupInfo((prev) => ({
          ...prev,
          title: `<span class='color-primary1'>${data.data.amount}원</span> 받았어요!`,
          subTitle: `댓글에 좋아요 ${data.data.attainment}개 누르기`,
          isShow: true,
        }));
      }
    },
    [profile?.userId, setLikeComment],
  );

  // NOTE 유저프로필 클릭 시 유저상세페이지로 연결
  const onMoveUserPage = () => {
    // TODO - 유저 상세페이지 추후개발
    // router.push({
    //   pathname: `/seller/${userId}`,
    //   query: { userId },
    // });
  };

  // NOTE 좋아요/싫어요 클릭
  const onClickSetValue = useCallback(
    async ({ type }: { type: "like" | "dislike" }) => {
      if (!isLogin) router.push("/auth/signin");
      else if (!postData?.priceInfo) return;
      else {
        const { isLike, isDislike } = postData.priceInfo;

        if (!isLike && !isDislike) {
          await mutateSetValue({ type, isTrue: true });

          if (type === "dislike") return;

          const { data } = await isDailyEventSuccess(profile?.userId, "ARTICLE_LIKE");
          if (data.data.done) {
            setDailyEventPopupInfo((prev) => ({
              ...prev,
              title: `<span class='color-primary1'>${data.data.amount}원</span> 받았어요!`,
              subTitle: `비법글에 좋아요 ${data.data.attainment}개 누르기`,
              isShow: true,
            }));
          }

          return;
        } else if (type === "like" && isDislike)
          return mutateSetValue({ type: "dislike", isTrue: false });
        else if (type === "dislike" && isLike)
          return mutateSetValue({ type: "like", isTrue: false });

        return mutateSetValue({ type, isTrue: false });
      }
    },
    [isLogin, mutateSetValue, postData, profile?.userId, router],
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
  });

  // NOTE 다른 글로 이동하는 함수
  const onClickMoveToPost = (articleId: number) => router.push(`/post/${articleId}`);

  // NOTE 비상장글이거나 구매한 글인지 여부
  const hasOwnership = useMemo(
    () =>
      postData ? !!(!postData.articleInfo.isListed || postData.articleInfo.isPurchased) : false,
    [postData],
  );

  return (
    <>
      <Head>
        <title>{`비법거래소 • ${postData?.articleInfo.title}`}</title>

        <meta property="og:title" content={postData?.articleInfo.title} />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:image" content={postData?.articleInfo.thumbnail} />
        <meta property="og:description" content="검증된 꿀팁 모음, 비법거래소" />
      </Head>

      <CommonHeader />

      <main className={styles.main_container}>
        {/* 구매 윤리문구  */}
        <SubHeader />

        <div className={styles.postScreen}>
          <section className={styles.contSec}>
            {/* SECTION 타이틀 영역 */}
            <article className={styles.topBar}>
              <div className={styles.verArea}>
                <div className={styles.leftCont}>
                  {/* NOTE 현재 글 카테고리 */}
                  <h2 className={styles.category}>{postData?.boardInfo.description}</h2>

                  {/* NOTE 비상장글 이거나 구매한 글일 때 */}
                  {hasOwnership && (
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
                          {moment(postData?.articleInfo.versionCreatedAt).format("YY.MM.DD")}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* NOTE 글 히스토리(이전 버전) */}
                {/* NOTE 비상장글 이거나 구매한 글일 때 출력 */}
                {/* <div className={styles.rightCont}>
                  {hasOwnership && (
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
                        {!!(postData?.userInfo.gradeType === "MASTER") && <Gold />}
                        {!!(postData?.userInfo.gradeType === "SEMI") && <Silver />}
                      </>

                      <p onClick={onMoveUserPage} className={styles.cursor}>
                        {postData?.userInfo.nickname}
                      </p>
                    </div>

                    {hasOwnership ? (
                      // NOTE 비상장글 이거나 구매한 글일 때 - 조회수
                      <div className={`${styles.creatorBox} ${styles.contBox}`}>
                        <Eye />

                        <p>
                          {new Intl.NumberFormat().format(postData?.articleInfo.totalViewNum || 0)}
                        </p>
                      </div>
                    ) : (
                      // NOTE 비구매 글일 때 - 작성일
                      <div className={`${styles.creatorBox} ${styles.contBox}`}>
                        <p>
                          작성일{" "}
                          {moment(new Date(postData?.articleInfo.versionCreatedAt || "")).format(
                            "YYYY.MM.DD",
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.rightCont}>
                    <button className={styles.urlCopyBtn} onClick={urlCopy}>
                      URL 복사
                    </button>
                    {/* NOTE 로그인 && (비상장 || 구매한 글)인 유저만 볼 수 있는 더보기 메뉴 */}
                    {hasOwnership && (
                      <div className={styles.btnBox}>
                        {isLogin && hasOwnership && (
                          <button
                            className={styles.moreBtn}
                            onClick={() => hook.setMorePopup(true)}
                          >
                            <Dot3 />
                          </button>
                        )}

                        {hook.morePopup && (
                          <>
                            <PostMorePopup
                              isMyPost={!!(currentUserData?.id === userId)}
                              isListed={postData?.articleInfo.isListed}
                              UsePost={hook}
                              onClickSetPrivate={() => {
                                hook.setMorePopup(false);
                                setOpenConfirmPrivate(true);
                              }}
                              onClickEdit={() => {
                                hook.setMorePopup(false);
                                setOpenConfirmEdit(true);
                              }}
                              onClickDelete={() => {
                                hook.setMorePopup(false);
                                setOpenConfirmDelete(true);
                              }}
                            />
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
            {hasOwnership ? (
              <>
                <article className={styles.contArea}>
                  {editor && <EditorContent readOnly editor={editor} height={"100%"} />}
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
                      <Image
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
                        <p className={`${postData?.priceInfo.isLike ? styles.like : ""}`}>좋아요</p>
                        <h2
                          className={`${styles.price} ${
                            postData?.priceInfo.isLike ? styles.like : ""
                          }`}
                        >
                          {(postData?.priceInfo.likeNum || 0) -
                            (postData?.priceInfo.dislikeNum || 0)}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    // NOTE 구매한글일 때
                    <div
                      className={`${
                        postData?.priceInfo.isLike ? styles.up : ""
                      } ${postData?.priceInfo.isDislike ? styles.dn : ""} ${styles.innerCont}`}
                    >
                      <button
                        className={styles.likeBtn}
                        onClick={() => onClickSetValue({ type: "like" })}
                      >
                        {postData?.priceInfo.isLike ? <ThumbUpRed /> : <ThumbUpGrey />}
                        <p>+1P</p>
                      </button>

                      <div className={styles.currentBox}>
                        <p>현재가</p>
                        <h2 className={styles.price}>{`${new Intl.NumberFormat().format(
                          Number(postData?.priceInfo.price),
                        )}P`}</h2>
                        <p className={styles.percent}>
                          {formatRate(postData?.priceInfo.changeRate || 0)}%
                        </p>
                      </div>

                      <button
                        className={styles.likeBtn}
                        onClick={() => onClickSetValue({ type: "dislike" })}
                      >
                        {postData?.priceInfo.isDislike ? <ThumbDnBlue /> : <ThumbDnGrey />}
                        <p>-1P</p>
                      </button>
                    </div>
                  )}
                </article>

                {/* NOTE 태그 영역 */}
                <article className={styles.replyArea}>
                  <ul className={styles.tagList}>
                    {postData?.tagList.map(({ tagName, tagId }) => <li key={tagId}>{tagName}</li>)}
                  </ul>

                  {/* NOTE 비상장글/구매한글일 때 댓글 */}
                  <div className={styles.inputCont}>
                    <div className={styles.wrapper}>
                      <div className={styles.countBar}>
                        <Message />

                        <p className={styles.key}>댓글</p>
                        <p className={styles.value}>{comments?.pages[0].totalElements ?? 0}</p>
                      </div>

                      <div
                        className={styles.sortBy}
                        onClick={() => setShowCommentSortByPopup(true)}
                      >
                        <span>{commentSortByInfo[commentSortBy]}</span>
                        <Image
                          src={"/assets/icons/SortAscending.svg"}
                          alt={"sort"}
                          width={16}
                          height={16}
                        />

                        {showCommentSortByPopup && (
                          <>
                            <CommentSortByPopup onClickSetCommentSortBy={onClickSetCommentSortBy} />
                            <PopupBg
                              off={(e) => {
                                e.stopPropagation();
                                setShowCommentSortByPopup(false);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* NOTE 로그인한 유저에게만 댓글 입력창 출력 */}
                    {!!isLogin && (
                      <div className={styles.inputBox}>
                        <textarea
                          ref={(ref) => {
                            if (ref?.style) {
                              ref.style.minHeight = "54px";
                              ref.style.height = "auto";
                              ref.style.height = `${ref?.scrollHeight}px`;
                              ref.style.maxHeight = "200px";
                            }
                          }}
                          rows={1}
                          value={commentContent}
                          onChange={({ target: { value } }) => onChangeComment(value)}
                          placeholder="댓글을 입력해주세요"
                        />

                        <button
                          className={styles.enrollBtn}
                          aria-disabled={!isValidComment}
                          onClick={onSubmit}
                        >
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
                              isMyComment={!!(currentUserData?.id === props.userId)}
                              hasOwnership={hasOwnership}
                              data={props}
                              nested={!!(props.parentCommentId != null)}
                              onClickLikeComment={onClickLikeComment}
                              onClickUpdateComment={onClickUpdateComment}
                              onClickDeleteComment={onClickDeleteComment}
                              onClickCreateComment={onClickCreateComment}
                            />
                          </li>
                        )),
                      )}
                      {!!comments?.pages[0].contents.length &&
                        (!isFetchingNextPage ? (
                          <InView onChange={(inView) => inView && hasNextPage && fetchNextPage()} />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Image
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
                  {postData?.articleInfo.content && (
                    <article style={{ maxHeight: "500px", overflow: "hidden" }}>
                      {editor && <EditorContent readOnly editor={editor} height={"100%"} />}
                    </article>
                  )}
                  <div className={styles.overlayBox}>
                    <button
                      className={classNames(
                        styles.favBtn,
                        !!postData?.articleInfo.interest && styles.on,
                      )}
                      onClick={() =>
                        mutateBookmark({
                          articleId: Number(articleId),
                          bookmarking: !postData?.articleInfo.interest,
                        })
                      }
                      data-testid={!!postData?.articleInfo.interest ? "thumbRed" : "thumbGrey"}
                    >
                      {!!postData?.articleInfo.interest ? <HeartRedO /> : <HeartGrey />}

                      <p>찜하기</p>
                    </button>

                    <p className={styles.plzBuy}>전체글을 보려면 구매해주세요.</p>
                  </div>
                </article>

                {/* NOTE 비구매글일 때 댓글 */}
                <article className={styles.replyArea}>
                  <div className={styles.inputCont}>
                    <div className={styles.represent_comment_container}>
                      <p className="p1 bold color-black1">대표댓글</p>
                    </div>

                    {/* 대표 댓글이 없을경우 */}
                    {comments?.pages[0].totalElements === 0 ? (
                      <div className={styles.represent_no_comment_container}>
                        <p className="p1 color-gray1">대표 댓글이 없습니다.</p>
                      </div>
                    ) : (
                      <ul className={styles.replyList}>
                        {comments?.pages.map((page) =>
                          page.contents
                            .filter((item) => !item.parentCommentId)
                            .slice(0, 3)
                            .map((props) => (
                              <li key={props.commentId}>
                                <Reply
                                  isMyComment={!!(currentUserData?.id === props.userId)}
                                  hasOwnership={hasOwnership}
                                  data={props}
                                  nested={!!(props.parentCommentId != null)}
                                  onClickLikeComment={() => null}
                                  onClickUpdateComment={onClickUpdateComment}
                                  onClickDeleteComment={onClickDeleteComment}
                                  onClickCreateComment={onClickCreateComment}
                                />
                              </li>
                            )),
                        )}
                      </ul>
                    )}
                  </div>
                </article>
              </>
            )}
          </section>
          {/* !SECTION */}

          {/* SECTION 우측 영역 */}
          <aside>
            {/* NOTE 비상장글 이거나 구매글일 때 */}
            {hasOwnership ? (
              <>
                <article className={styles.creatorArea}>
                  <div className={styles.profImgBox} onClick={onMoveUserPage}>
                    <Image
                      src={postData?.userInfo.image || DefaultProfImg.src}
                      loader
                      width={48}
                      height={48}
                      alt=""
                    />
                  </div>

                  <div className={styles.nicknameBar} onClick={onMoveUserPage}>
                    <h1 className={styles.nickname}>{postData?.userInfo.nickname}</h1>
                    <>
                      {!!(postData?.userInfo.gradeType === "MASTER") && <Gold />}
                      {!!(postData?.userInfo.gradeType === "SEMI") && <Silver />}
                    </>
                  </div>

                  <p className={styles.profMsg}>{postData?.userInfo.description}</p>
                </article>

                {/* NOTE 작성자의 다른 글 목록 */}
                {!!articlesByUser.length && (
                  <article className={`${styles.otherPostArea} ${styles.postListArea}`}>
                    <p className={styles.areaTitle}>{postData?.userInfo.nickname}님의 다른 글</p>

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
                <article className={`${styles.categoryPopularPostList} ${styles.postListArea}`}>
                  <p className={styles.areaTitle}>{postData?.boardInfo.description}의 인기글</p>

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
                          <Image src="/assets/icons/Warn.svg" width={48} height={48} alt="" />
                          <p className={styles.emptyDesc}>인기글이 없습니다</p>
                          <button onClick={() => router.push("/popular")}>
                            <p>전체 인기글 보러가기</p>

                            <Image
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
                    <div className={`${styles.diffBox} ${getDiffStyle(1 || 0)}`}>
                      <p>
                        +{formatRate(postData?.priceInfo.changeRate || 0)}% (
                        {postData?.priceInfo.changeAmount || 0})
                      </p>
                    </div>

                    <div className={`${styles.priceBox} ${getDiffStyle(1 || 0)}`}>
                      <p className={styles.key}>현재가</p>
                      <p className={styles.value}>
                        {Intl.NumberFormat().format(postData?.priceInfo.price || 0)} P
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
        </div>
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

      {hook.reportUserPopup && postData?.userInfo.userId && (
        <>
          <ReportUserPopup
            userId={postData?.userInfo.userId}
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
            confirmFunc={() => mutateHidePosts({ author: userId, userId: currentUserData.id })}
            cancelFunc={() => hook.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => hook.setHideUserPostPopup(false)} />
        </>
      )}

      {hook.compReportPopup && (
        <CommonPopup
          title="신고가 접수되었습니다."
          confirmFunc={() => hook.setCompReportPopup(false)}
        />
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
          <BuyPostPopup
            title={postData?.articleInfo.title || ""}
            price={postData?.priceInfo.price || 0}
            refetchArticle={refetchPostData}
            usePost={hook}
          />
          <PopupBg bg off={() => hook.setBuyPopup(false)} />
        </>
      )}

      {hook.compPayPopup && (
        <>
          <CompPayPopup usePost={hook} refetchArticle={refetchPostData} />
          <PopupBg bg />
        </>
      )}

      {copied && (
        <>
          <ErrorMsgPopup msg="URL이 복사되었습니다. " confirmFunc={() => setCopied(false)} />
          <PopupBg bg off={() => setCopied(false)} />
        </>
      )}

      {hook.changePricePopup && (
        <CommonPopup
          title="가격이 변동되었어요"
          subTitle="다시 결제를 진행해주세요."
          confirmFunc={() => hook.setChangePricePopup(false)}
        />
      )}

      {/* NOTE - 내 글 비공개 전환 확인 팝업 */}
      {openConfirmPrivate && (
        <>
          <ConfirmPopup
            title="비공개로 전환하시겠습니까?"
            content="비공개로 전환시 더 이상 홈에 노출되지 않아 추가 수익이 발생되지 않습니다. 이미 구매한 사용자는 계속 열람할 수 있습니다."
            // TODO - 비공개/공개 처리
            confirmFunc={() => {}}
            cancelFunc={() => setOpenConfirmPrivate(false)}
          />
          <PopupBg bg off={() => setOpenConfirmPrivate(false)} />
        </>
      )}

      {/* NOTE - 내 글 수정 여부 확인 팝업 */}
      {openConfirmEdit && (
        <PostEditConfirmPopup
          isListed={postData?.articleInfo.isListed ?? false}
          onClosePopup={() => setOpenConfirmEdit(false)}
          // TODO - 게시글 수정 화면 전환
          onConfirmEdit={() => {
            // edit화면으로 보내기
            router.push(`/edit/${articleId}`);
          }}
        />
      )}

      {/* NOTE - 내 글 삭제 여부 확인 팝업 */}
      {openConfirmDelete && (
        <PostDeleteConfirmPopup
          onClosePopup={() => setOpenConfirmDelete(false)}
          onConfirmDelete={onConfirmDelete}
        />
      )}

      {/* NOTE - 내 글 삭제 완료 확인 팝업 */}
      {openConfirmDeleteComplete && (
        <ConfirmTitlePopup
          title="글이 삭제되었습니다."
          confirmFunc={() => router.push(`/mypage/write`)}
        />
      )}

      {/* 보상지급 완료 팝업 */}
      {dailyEventPopupInfo.isShow && (
        <CommonPopup
          title={dailyEventPopupInfo.title}
          subTitle={dailyEventPopupInfo.subTitle}
          iconSrc="/assets/icons/RewardIcon.png"
          iconWidth={96}
          iconHeight={96}
          confirmFunc={() =>
            setDailyEventPopupInfo((prev) => {
              return { ...prev, isShow: false };
            })
          }
        />
      )}

      {/* 결제실패 에러 팝업 */}
      {hook.isPurchaseErrorPopupShow && (
        <CommonPopup
          subTitle="알 수 없는 오류입니다."
          iconSrc="/assets/icons/Warning.svg"
          iconWidth={60}
          iconHeight={60}
          confirmFunc={() => hook.setIsPurchaseErrorPopupShow(false)}
        />
      )}

      {/* 댓글 도배 팝업 */}
      {hook.isSpamPopupShow && (
        <CommonPopup
          title="댓글 도배"
          subTitle="3분 뒤에 다시 작성할 수 있어요."
          confirmFunc={() => hook.setIsSpamPopupShow(false)}
        />
      )}
    </>
  );
}

// NOTE 우측 영역 목록 아이템
const ArticleItem = ({
  boardInfo: { description },
  articleInfo: { createdAt, title, thumbnail, listed, articleId },
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
          <strong className={styles.category}>{description}</strong>・{moment(createdAt).fromNow()}
        </p>
      </div>

      <div className={styles.contBar} onClick={() => onClickMoveToPost(articleId)}>
        <div className={styles.leftCont}>
          <p className={styles.title}>{title}</p>

          <div className={styles.thumbnailBox}>
            {thumbnail && (
              <Image
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
          <div className={`${styles.rightCont} ${getDiffStyle(changeRate || 0)}`}>
            <p className={styles.diff}>
              {`${(changeRate || 0) > 0 ? "+" : ""}${formatRate(changeRate || 0)}% (${changeAmount || 0})`}
            </p>

            <p className={styles.price}>{`${new Intl.NumberFormat().format(price || 0)} P`}</p>
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

// NOTE 댓글 정렬 팝업
const CommentSortByPopup = ({
  onClickSetCommentSortBy,
}: {
  onClickSetCommentSortBy: (sortBy: CommentSortByType) => void;
}) => (
  <section className={styles.commentPopup}>
    {Object.entries(commentSortByInfo).map(([key, label]) => (
      <button
        key={key}
        onClick={(e) => {
          e.stopPropagation();
          onClickSetCommentSortBy(key as CommentSortByType);
        }}
      >
        <p>{label}</p>
      </button>
    ))}
  </section>
);
