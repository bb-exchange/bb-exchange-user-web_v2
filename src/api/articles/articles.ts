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

export interface Pager {
  pageNumber: number;
  numberOfElements: number;
  size: number;
  hasNext: boolean;
}

export interface Contents {
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

export type Articles = Pager & { contents: Array<Contents> };

export type ArticleSortByType = "LATEST" | "POPULAR" | "LISTED" | "PRICE";

// NOTE 게시글 목록
export const articles = async (params: {
  category: string;
  sortBy: ArticleSortByType;
  page: number;
}) =>
  await basicInstance
    .get(`/v1/articles`, { params })
    .then(({ data: { data } }: { data: { data: Articles } }) => data);

// NOTE 작성자의 게시글 목록
export const articlesByUser = async ({
  userId,
  sortBy = "PRICE",
  page = 0,
  size = 3,
}: {
  userId?: number;
  sortBy?: ArticleSortByType;
  page?: number;
  size?: number;
}) =>
  await basicInstance
    .get(`/v1/articles/users/${userId}`, { params: { sortBy, page, size } })
    .then(({ data: { data } }: { data: { data: Articles } }) => data.contents);

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

// NOTE 게시글 찜 등록/찜 해제
export const updateArticleBookmark = async ({
  bookmarking,
  articleId,
}: {
  bookmarking: boolean;
  articleId: number;
}) => {
  const method = bookmarking ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/articles/interests/${articleId}`,
    method,
  }).then(({ data: { message } }: { data: { message: string } }) => message);
};
