export interface PostData {
  boardInfo: {
    category: string;
    description: string;
  };
  userInfo: {
    gradeType: "GENERAL" | "MASTER" | "SEMI";
    image: string;
    userId: number;
    nickname: string;
    description: string;
  };
  articleInfo: {
    articleId: number;
    isListed: boolean;
    title: string;
    version: number;
    updatedAt: string;
    totalViewNum: number;
    content: string;
    isPurchased: boolean;
  };
  priceInfo: {
    likeNum: number;
    dislikeNum: number;
    isLike: boolean;
    isDislike: boolean;
    price: number;
    changeRate: number;
    changeAmount: number;
  };
  tagList: Array<{ tagId: number; tagName: string }>;
}
