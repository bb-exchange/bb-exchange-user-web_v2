export const D_eventList: D_eventList[] = [
  {
    id: 1,
    name: "ATTENDANCE",
    type: "plain",
    image: "/assets/icons/Attendance.svg",
    title: "앱에서 출석하기",
  },
  {
    id: 2,
    name: "ARTICLE_LIKE",
    type: "replace",
    image: "/assets/icons/ArticleLike.svg",
    path: "/popular",
    title: "글에 좋아요 ${count}개 누르기",
  },
  {
    id: 3,
    name: "ARTICLE_COMMENT",
    type: "replace",
    image: "/assets/icons/ArticleComment.svg",
    path: "/popular",
    title: "글에 댓글 ${count}개 작성하기",
  },
  {
    id: 4,
    name: "COMMENT_LIKE",
    type: "replace",
    image: "/assets/icons/CommentLike.svg",
    path: "/popular",
    title: "댓글에 좋아요 ${count}개 누르기",
  },
  {
    id: 5,
    name: "WRITE_ARTICLE_WITH_LIKES",
    type: "replace",
    image: "/assets/icons/writeArticleWithLike.svg",
    path: "/enroll",
    title: "비법글 작성하고 좋아요 ${count}개 받기",
  },
  {
    id: 6,
    name: "INVITE",
    type: "plain",
    image: "/assets/icons/invite.svg",
    path: "/popular",
    title: "친구 초대하기",
  },
];

export const D_eventFooterList: string[] = [
  "포인트는 10,000원 이상 모아 출금하거나, 비법거래소 포인트로 전환하여 상장된 글을 구매할 수 있어요.",
  "‘글 작성하고 좋아요 받기‘ 미션은 <span class='h3 bold'>오늘 작성한 글</span>이 <span class='h3 bold'>오늘 좋아요</span> 를 미션갯수만큼 받아야 달성하는 미션이에요.",
  "‘친구 초대하기‘ 미션은 친구가 내 추천인 코드를 통해 가입해야 집계할 수 있어요.",
  "‘글에 댓글 작성하기’ 미션에서 <span class='h3 bold'>성의 없는 댓글, 본인 글에 대한 댓글(대댓글 포함)</span>은 포인트 지급이 불가 / 지급 시 최소될 수 있어요.",
  "‘댓글에 좋아요 누르기‘ 미션에서 <span class='h3 bold'>본인 댓글(대댓글 포함)의 좋아요</span>는 포인트 지급이 불가 / 지급 시 취소될 수 있어요.",
  "회사 사정에 따라 사전 공지 없이 미션 조건 및 리워드 금액이 다음날부터 변동되거나 서비스가 종료될 수 있어요.",
];
