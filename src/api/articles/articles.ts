import { basicInstance } from "../instance";

export const fetchArticles = async ({ queryKey }: { queryKey: any[] }) => {
  const [sortBy, page]: string[] = queryKey;

  return await basicInstance.get(`/v1/articles`, {
    params: {
      sortBy: sortBy.toUpperCase(),
      page,
    },
  });
};

interface Pager {
  pageNumber: number;
  numberOfElements: number;
  size: number;
  hasNext: boolean;
}

interface Contents {
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
    updatedAt: string;
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

type Articles = Pager & { contents: Array<Contents> };

export const articles = async (params: {
  category: string;
  sortBy: "LATEST" | "POPULAR" | "LISTED";
  page: number;
}) =>
  await basicInstance
    .get(`/v1/articles`, { params })
    .then(({ data: { data } }: { data: { data: Articles } }) => data);

export const postArticle = async (formData: IpostArticle) => {
  basicInstance.post(`/v1/articles`, formData).then((res) => console.log(res));
};

export const postImages = async (formData: any) => {
  console.log(formData);

  return basicInstance.post("/v1/images/multi", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const userArticles = async (query: string) => {
  return await basicInstance.get(`/v1/articles/users/${query}`);
};

export const userInterestsArticles = async (query: string) => {
  return await basicInstance.get(`/v1/articles/interests/users/${query}`);
};

export const fetchArticleLike = async (articleId: number) => {
  return await basicInstance.post(`/v1/articles/${articleId}/like`);
};
