export interface IPostDetailRes {
  data: {
    data: {
      articleInfo: {
        articleId: number;
        content: string;
        isListed: boolean;
        title: string;
        totalViewNum: number;
        updatedAt: string;
      };
      boardInfo: {
        category: string;
        description: string;
      };
      priceInfo: {
        changeRate: number;
        dislikeNum: number;
        isDislike: boolean;
        isLike: boolean;
        likeNum: number;
        price: number;
      };
      tagList: [];
      userInfo: {
        description: string;
        gradeType: string;
        image: string | null;
        nickname: string;
        userId: number;
      };
    };
  };
}
