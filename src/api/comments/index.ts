import { PageData } from ".src/api/interface";
import { basicInstance } from "../instance";

export interface CommentData {
  parentCommentId: number | null;
  commentId: number;
  userId: number;
  nickname: string;
  content: string;
  likeCounts: number;
  isLike: boolean;
  createdAt: number;
  isDeleted: boolean;
  gradeType: "MASTER" | "SEMI" | "GENERAL";
}

export type Comments = PageData & { contents: Array<CommentData> };

export type CommentSortByType = "POPULAR" | "LATEST" | "EARLIEST";

// NOTE 댓글 목록
export const commentsByArticleId = async ({
  articleId,
  page = 0,
  ...props
}: {
  articleId?: string;
  page?: number;
  size?: number;
  sortBy?: CommentSortByType;
  currentUserId?: number;
}) =>
  await basicInstance
    .get(`/v1/comments/articles/${articleId}`, { params: { page, ...props } })
    .then(({ data: { data } }: { data: { data: Comments } }) => data)
    .catch((error) => {
      throw error.response.data;
    });

// NOTE 신규 댓글 추가
export const createComment = async (params: {
  articleId: string;
  parentCommentId: number | null;
  content: string;
}) =>
  await basicInstance
    .post(`/v1/comments`, params)
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });

// NOTE 댓글 좋아요 등록/해제
export const updateLikeComment = async ({
  isLike,
  commentId,
}: {
  isLike: boolean;
  commentId: number;
}) => {
  const method = isLike ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/comments/${commentId}/like`,
    method,
  })
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });
};
