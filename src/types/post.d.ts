interface IpostData {
  boardInfo: {
    category: string;
    description: string;
  };
  userInfo: {
    image?: string;
    userId: number;
    nickname: string;
    description: string;
  };
  articleInfo: {
    articleId: number;
    isListed: boolean;
    title: string;
    updatedAt: string;
    totalViewNum: number;
    content: string;
  };
  priceInfo: {
    likeNum: number;
    dislikeNum: number;
    isLike: boolean;
    isDislike: boolean;
    price: number;
    changeRate: number;
  };
  tagList: [
    {
      tagId: number;
      tagName: string;
    }
  ];
}

interface IpostCategories {
  category: string;
  description: string;
}

interface Ireply {
  nickname?: string;
  tier?: "gold" | "silver";
  text?: JSX.Element;
  likeCount?: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  nestedReply?: Ireply[];
  createdAt?: Date;
}

interface IpostVersions {
  badge?: "best" | "new";
  now?: boolean;
  read?: boolean;
  num: number;
  createdAt: Date;
  title: string;
}

interface IpostReport {
  category: string;
  detail: string;
}

interface IuserReport {
  category: string;
  detail: string;
}

interface IpostArticle {
  title: string;
  category: string;
  content: string;
  articleTagList: string[];
  thumbnailImage: string;
}
