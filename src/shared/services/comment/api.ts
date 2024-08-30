import api from "@/shared/lib/api";
import { CommentListResponse, CommentRequest } from "@/shared/types/commentType";

/** 댓글 리스트 조회 */
export const GET_comments_by_article_id = async ({
  articleId,
}: {
  articleId: number;
}): Promise<CommentListResponse> => {
  const { data } = await api.get(`/v1/comments/articles/${articleId}`, { requireToken: true });
  return data;
};

/** 댓글 작성 */
export const POST_comments = async (params: CommentRequest) => {
  const { data } = await api.post(`/v1/comments`, params, { requireToken: true });
  return data;
};

/** 댓글 수정 */
export const PATCH_comments_by_id = async ({ commentId }: { commentId: number }) => {
  const { data } = await api.patch(`/v1/comments/${commentId}`, { requireToken: true });
  return data;
};

/** 댓글 삭제 */
export const DELETE_comments_by_id = async ({ commentId }: { commentId: number }) => {
  const { data } = await api.delete(`/v1/comments/${commentId}`, { requireToken: true });
  return data;
};
