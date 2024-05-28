import { PageData } from "./common";

export type BoardProps = {
  image: string;
  category: string;
  description: string;
};
type UserProps = {
  gradeType: string;
  userId: number;
  nickname: string;
};
type ArticleProps = {
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
type PriceProps = {
  likeNum: number;
  changeAmount: number;
  changeRate: number;
  price: number;
};
export interface ArticleData {
  boardInfo: BoardProps;
  userInfo: UserProps;
  articleInfo: ArticleProps;
  priceInfo: PriceProps;
}

export type Articles = PageData & { contents: Array<ArticleData> };

export type ArticleSearchType = "LATEST" | "POPULAR" | "LISTED";

export type ArticleSortBy = "LATEST" | "PRICE";
