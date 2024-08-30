import api from "@/shared/lib/api";
import { ArticleListResponse, ArticleRequest } from "@/shared/types/articleType";

/** 게시글 조회 */
export const GET_articles_by_id = async ({
  articleId,
}: {
  articleId: number;
}): Promise<ArticleListResponse> => {
  const { data } = await api.get(`/v1/articles/${articleId}`, { requireToken: true });
  return data;
};

/** 게시글 작성 */
export const POST_articles = async (params: ArticleRequest) => {
  const { data } = await api.post(`/v1/articles`, params, { requireToken: true });
  return data;
};

/** 게시글 수정 */
export const PATCH_articles_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.patch(`/v1/articles/${articleId}`, { requireToken: true });
  return data;
};
/** 게시글 썸네일 수정 */
export const PATCH_articles_thumbnail_by_id = async ({
  articleId,
  params,
}: {
  articleId: number;
  params: { thumbnail: string };
}) => {
  const { data } = await api.patch(`/v1/articles/${articleId}/thumbnail`, params, {
    requireToken: true,
  });
  return data;
};

/** 게시글 공개 전환 */
export const PATCH_articles_show_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.patch(`/v1/articles/show/${articleId}`, { requireToken: true });
  return data;
};
/** 게시글 비공개 전환 */
export const PATCH_articles_hide_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.patch(`/v1/articles/hide/${articleId}`, { requireToken: true });
  return data;
};
/** 게시글 삭제 */
export const DELETE_articles_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.delete(`/v1/articles/${articleId}`, { requireToken: true });
  return data;
};

/** 게시글 좋아요 */
export const POST_articles_like_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.post(`/v1/articles/${articleId}/like`, { requireToken: true });
  return data;
};

/** 게시글 좋아요 취소 */
export const DELETE_articles_like_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.delete(`/v1/articles/${articleId}/like`, { requireToken: true });
  return data;
};

/** 게시글 싫어요 */
export const POST_articles_dislike_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.post(`/v1/articles/${articleId}/dislike`, { requireToken: true });
  return data;
};

/** 게시글 싫어요 취소 */
export const DELETE_articles_dislike_by_id = async ({ articleId }: { articleId: number }) => {
  const { data } = await api.delete(`/v1/articles/${articleId}/dislike`, { requireToken: true });
  return data;
};
