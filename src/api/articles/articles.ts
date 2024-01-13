import { basicInstance } from "../instance";

import { ArticleSearchType, ArticleSortBy, Articles } from "../interface";

export const fetchArticles = async ({ queryKey }: { queryKey: any[] }) => {
  const [sortBy, page]: string[] = queryKey;

  return await basicInstance.get(`/v1/articles`, {
    params: {
      sortBy: sortBy.toUpperCase(),
      page,
    },
  });
};

// NOTE 게시글 목록
export const articles = async (params: {
  category: string;
  searchType: ArticleSearchType;
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
  size = 4,
}: {
  userId?: number;
  sortBy?: ArticleSortBy;
  page?: number;
  size?: number;
}) =>
  await basicInstance
    .get(`/v1/articles/users/${userId}`, { params: { sortBy, page, size } })
    .then(({ data: { data } }: { data: { data: Articles } }) => data.contents);

// NOTE 글 작성하기
interface IArticle {
  title: string;
  category: string;
  content: any;
  articleTagList: string[];
  thumbnailImage: string;
}
export const postArticle = async (body: IArticle) =>
  await basicInstance
    .post(`/v1/articles`, body)
    .then(({ data: { data: data } }) => data);

export const postImages = async (formData: any) => {
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

// NOTE 게시글 임시 저장
export const postArticleTemp = async (body: IArticle) => {
  (await basicInstance.post(`/v1/articles/temp`, body)).data;
};

// NOTE 임시 게시글 목록
export const getArticlesTemp = async () =>
  (await basicInstance.get(`/v1/articles/temp`)).data;

// NOTE 임시 게시글 조회
export const getArticleTemp = async (articleId: number) =>
  (await basicInstance.get(`/v1/articles/temp/${articleId}`)).data;

// NOTE 임시 게시글 수정
interface IPatchAriticleTemp {
  articleId: number;
  body: IArticle;
}
export const patchArticleTemp = async (data: IPatchAriticleTemp) =>
  (await basicInstance.patch(`/v1/articles/temp/${data.articleId}`, data.body))
    .data;

// NOTE 임시 게시글 삭제
export const deleteArticleTemp = async (articleId: number) =>
  (await basicInstance.delete(`/v1/articles/temp/${articleId}`)).data;
