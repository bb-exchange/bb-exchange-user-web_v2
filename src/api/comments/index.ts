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
}

export type Comments = PageData & { contents: Array<CommentData> };

export const commentsByArticleId = async ({
  articleId,
  page = 0,
  ...props
}: {
  articleId?: string;
  page?: number;
  size?: number;
  sortBy?: "POPULAR" | "LATEST" | "EARLIEST";
  currentUserId?: number;
}) =>
  await basicInstance
    .get(`/v1/comments/articles/${articleId}`, { params: { page, ...props } })
    .then(({ data: { data } }: { data: { data: Comments } }) => data)
    .catch((error) => {
      throw error.response.data;
    });
