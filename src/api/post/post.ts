import { basicInstance } from "../instance";
import { PostData } from "../interface";

// NOTE 게시글 상세
export const postById = async (articleId?: string) =>
  await basicInstance
    .get(`/v1/articles/${articleId}`)
    .then(({ data: { data } }: { data: { data: PostData } }) => data);

// NOTE - 게시글 삭제
export const deletePost = async (articleId?: string) =>
  await basicInstance
    .delete(`/v1/articles/${articleId}`)
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });

// NOTE 게시글 좋아요 등록/해제
export const updateLikePost = async ({
  isLike,
  articleId,
}: {
  isLike: boolean;
  articleId: string;
}) => {
  const method = isLike ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/articles/${articleId}/like`,
    method,
  })
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });
};

// NOTE 게시글 싫어요 등록/해제
export const updateDislikePost = async ({
  isDislike,
  articleId,
}: {
  isDislike: boolean;
  articleId: string;
}) => {
  const method = isDislike ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/articles/${articleId}/dislike`,
    method,
  })
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });
};

type ArticleHistories = Array<{
  id: number;
  version: number;
  createdAt: string;
  title: string;
  isArticle: boolean;
  isRead: boolean;
}>;

// NOTE 게시글 히스토리(버전) 목록
export const articleHistories = async (articleId?: string) =>
  await basicInstance
    .get(`/v1/articles/${articleId}/log`)
    .then(({ data: { data } }: { data: { data: ArticleHistories } }) => data)
    .catch((error) => {
      throw error.response.data;
    });

interface ArticleHistory {
  version: number;
  id: number;
  title: string;
  updatedAt: string;
  content: string;
}

// NOTE 게시글 히스토리에서 히스토리(버전) 선택했을 때
export const articleHistoryByVersion = async ({
  articleId,
  version,
}: {
  articleId: string;
  version: number;
}) =>
  await basicInstance
    .get(`/v1/articles/${articleId}/log/${version}`)
    .then(({ data: { data } }: { data: { data: ArticleHistory } }) => data)
    .catch((error) => {
      throw error.response.data;
    });
