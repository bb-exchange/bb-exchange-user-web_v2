interface IhomeCategory {
  url: string;
  label: string;
}

interface IpostList {
  boardInfo: {
    image: string;
    category: string;
    description: string;
  };
  userInfo: {
    userId: number;
    nickname: string;
  };
  articleInfo: {
    articleId: number;
    updatedAt: string;
    title: string;
    commentNum: number;
    thumbnail: string;
    read: boolean;
    listed: boolean;
    interest: boolean;
    purchased: boolean;
  };
  priceInfo: {
    likeNum: number;
    changeAmount: number;
    changeRate: number;
    price: number;
  };
}
