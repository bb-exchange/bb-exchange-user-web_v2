import { PageData } from "./common";

export interface ArticleData {
  boardInfo: {
    image: string;
    category: string;
    description: string;
  };
  userInfo: {
    gradeType: string;
    userId: number;
    nickname: string;
  };
  articleInfo: {
    articleId: number;
    createdAt: string;
    title: string;
    commentNum: number;
    thumbnail: string;
    read: boolean;
    purchased: boolean;
    interest: boolean;
    listed: boolean;
  };
  priceInfo: {
    likeNum: number;
    changeAmount: number;
    changeRate: number;
    price: number;
  };
}

export type Articles = PageData & { contents: Array<ArticleData> };

export type ArticleSearchType = "LATEST" | "POPULAR" | "LISTED";

export type ArticleSortBy = "LATEST" | "PRICE";
