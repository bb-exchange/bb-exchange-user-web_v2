import { hourToSec } from ".src/util/dateTime";

export const D_otherPostList: any[] = [
  {
    title:
      "최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..",
    replyCount: 100,
    thumbnailUrl: "https://picsum.photos/200",
    categoryImg: "https://picsum.photos/40",
    category: "카테고리명",
    creatorNickname: "치은짱짱맨",
    createdAt: new Date(new Date().getTime() - 5 * hourToSec),
    percentOfChange: 50.4,
    amountOfChange: 63,
    point: 302,
  },
  {
    title:
      "최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..",
    replyCount: 100,
    thumbnailUrl: "https://picsum.photos/200",
    categoryImg: "https://picsum.photos/40",
    category: "카테고리명",
    creatorNickname: "치은짱짱맨",
    createdAt: new Date(new Date().getTime() - 5 * hourToSec),
    percentOfChange: -0.4,
    amountOfChange: 63,
    point: 999999,
  },
  {
    title:
      "최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..최대두줄최대두줄최대두줄최대두줄까지만쓸수있어요말줄임표..",
    replyCount: 100,
    thumbnailUrl: "https://picsum.photos/200",
    categoryImg: "https://picsum.photos/40",
    category: "카테고리명",
    creatorNickname: "치은짱짱맨",
    createdAt: new Date(new Date().getTime() - 5 * hourToSec),
    percentOfChange: 50.4,
    amountOfChange: 63,
    point: 999999,
  },
];

export const D_replyList: Ireply[] = [
  {
    nickname: "wooAng",
    tier: "gold",
    text: (
      <p>
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
      </p>
    ),
    likeCount: 9999,
    createdAt: new Date(),
  },
  {
    nickname: "wooAng",
    text: (
      <span>
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
      </span>
    ),
    likeCount: 9999,
    isLiked: true,

    nestedReply: [
      {
        nickname: "wooAng",
        tier: "silver",
        text: (
          <span>
            <strong>@wooAng</strong>
            감사합니다! 이 질문이 나와서 면접에서 자신감 있게
            대답했어요!감사합니다! 감사합니다! 이 질문이 나와서 면접에서 자신감
            있게 대답했어요!감사합니다!
          </span>
        ),
        likeCount: 9999,
        createdAt: new Date(),
      },
      { isDeleted: true },
    ],
  },
  {
    nickname: "wooAng",
    text: (
      <span>
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
        감사합니다! 이 질문이 나와서 면접에서 자신감 있게 대답했어요!감사합니다!
      </span>
    ),
    likeCount: 9999,
    createdAt: new Date(),
  },
  { isDeleted: true },
];
