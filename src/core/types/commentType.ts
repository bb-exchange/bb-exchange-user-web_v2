import { PageData } from "@/shared/constants/enums";

export type CommentSummary = {
  commentId: number;
  userId: number;
  nickname: string;
  content: string;
  likeCounts: number;
  isLike: boolean;
  parentCommentId: number;
  createdAt: number;
  isDeleted: boolean;
};

/** [GET] /v1/comments/articles/{articleId} : 댓글 리스트 조회 */
export type CommentListResponse = {
  data: {
    contents: CommentSummary[];
  } & PageData;
};

/** [POST] /v1/comments : 댓글 작성 */
export type CommentRequest = {
  articleId: number;
  parentCommentId: number;
  content: string;
};
