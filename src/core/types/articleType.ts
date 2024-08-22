import { BoardSummary } from "./boardType";
import { PriceSummary } from "./priceType";
import { TagSummary } from "./tagType";
import { UserSummary } from "./userType";

import { PageData } from "@/shared/constants/enums";

export type ArticleSummary = {
  articleId: number;
  updatedAt: number;
  createdAt: number;
  title: string;
  commentNum: number;
  thumbnail: string;
  totalViewNum: number;
  purchased: boolean;
  read: boolean;
  listed: boolean;
  interest: boolean;
};

type ArticleContent = {
  boardInfo: Pick<BoardSummary, "image" | "category" | "description">;
  userInfo: Pick<UserSummary, "gradeType" | "userId" | "nickname">;
  articleInfo: ArticleSummary;
  priceInfo: Pick<
    PriceSummary,
    "likeNum" | "changeAmount" | "changeRate" | "price" | "purchasePrice" | "priceDifference"
  >;
};

/** [GET] /v1/articles : 게시글 리스트 조회 */
export type ArticleListResponse = {
  data: {
    contents: ArticleContent[];
  } & PageData;
};

/** [GET] /v1/articles : 게시글 리스트 조회 params */
export type ArticleListParams = {
  category: string;
  searchType: "POPULAR" | "LATEST" | "LISTED";
};

/** [POST] /v1/articles : 게시글 작성 */
export type ArticleRequest = {
  title: string;
  category: string;
  content: string;
  articleTagList: string[];
  thumbnailImage: string;
};

/** [GET] /v1/articles/{articleId} : 게시글 조회 */
export type ArticleResponse = {
  data: {
    tagList: TagSummary[];
    isOwnArticle: boolean;
    isPublic: boolean;
  } & ArticleContent;
};
